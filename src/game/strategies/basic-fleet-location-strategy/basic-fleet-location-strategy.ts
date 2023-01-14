import {calcArea, createBattlefield, createUserFleet, getClearCells,
  getRandomElFromColl, isValidCoords, isValidShipCoords } from '../../../services/utils';
import { BattleFieldCell, Coords, Field, ShipInterface, ShipsList } from '../../../types';
import { CellType, shipMainClasses, ShipShape } from '../../../const';
import Ship from '../../../ships/ship/ship';

const normalizeBattlefieldForGame = (battlefield: BattleFieldCell[][]) : Field => battlefield
  .map((row) => row.map((cell) => cell.shipId ?? 0));

class BasicFleetLocationStrategy {
  battlefield: BattleFieldCell[][];
  fleet: ShipInterface[];
  shipsList: ShipsList;
  shipShape: ShipShape;

  constructor() {
    this.battlefield = [];
    this.fleet = [];
    this.shipsList = {};
    this.shipShape = ShipShape.Line;
  }

  createFleet = () => {
    const fleet = createUserFleet(this.shipsList, this.shipShape);
    this.fleet = shipMainClasses.reduce((acc: ShipInterface[], shipClass) => [...acc, ...fleet[shipClass]], []);
  }

  getBattleField = (field: Field, shipsList: ShipsList, shipShape?: ShipShape) => {
    if (shipShape) {
      this.shipShape = shipShape;
    }
    this.shipsList = shipsList;
    this.battlefield = createBattlefield(field);
    this.createFleet();
    this.putFleetOnTheField();
    return normalizeBattlefieldForGame(this.battlefield);
  }

  getClearCells() {
    const clearCells : { ids: Array<number>, cells: { [i: string | number]: BattleFieldCell } } = { ids: [], cells: {} };
    return this.battlefield.forEach((row) => {
      row.forEach((cell) => {
        if (cell.type === CellType.Clear) {
          const cellId = cell.id;
          clearCells.ids.push(cellId);
          clearCells.cells[cellId] = cell;
        }
      });
    });
  }

  putFleetOnTheField() {
    this.fleet.forEach((ship) => {
      this.putShipOnTheField(ship);
    });
  }

  putShipOnTheField(ship: Ship) {
    const clearCells = getClearCells(this.battlefield);
    const shipId = ship.getId();

    const getShipCoords = () : Coords[] => {
      const mainPointId = getRandomElFromColl(clearCells.ids);
      ship.setCoords(clearCells.cells[mainPointId].coords);
      const shipOrientation = getRandomElFromColl(ship.getOrientationVariants());
      ship.setOrientation(shipOrientation);
      const shipCoords = ship.getCoords();

      return isValidShipCoords(this.battlefield, shipCoords) ? shipCoords : getShipCoords();
    }

    const shipCoordsForWritingOnTheField = getShipCoords();
    shipCoordsForWritingOnTheField.forEach(({ x, y }) => {
      const cell = this.battlefield[y][x];
      cell.shipId = shipId;
      cell.type = CellType.Ship;
    });

    const shipArea = calcArea(shipCoordsForWritingOnTheField);
    const areaForWritingOnTheField = shipArea.filter((item) => isValidCoords(item, 0, this.battlefield.length - 1));
    areaForWritingOnTheField.forEach(({ x, y}) => {
      const cell = this.battlefield[y][x];
      cell.type = CellType.Area;
    })
  }
}

export default BasicFleetLocationStrategy;
