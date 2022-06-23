import flatten from 'lodash-ts/flatten';
import getAvailableShips from '../../../ships/get-available-ships';
import { isValidShipCoords, getRandomElFromColl, uniqueId, calcArea, isValidCoords } from '../../../services/utils';
import { BattleFieldCell, Coords, Field, ShipInterface, ShipShape, ShipsList } from '../../../types';
import { BattlefieldCellTypes, ShipMainClasses } from '../../../const';
import Ship from '../../../ships/ship/ship';

const createBattlefield = (field: Field) => field.map((row, x) => row.map((val, y) => {
  const id = uniqueId();
  const type = BattlefieldCellTypes.Clear;
  const shipId = null;
  const coords: Coords = { x, y };
  return { id, coords, type, shipId };
}));

const getClearCells = (battlefield: BattleFieldCell[][]) => {
  const clearCells : { ids: Array<number>, cells: { [i: string | number]: BattleFieldCell } } = { ids: [], cells: {} };
  battlefield.forEach((row) => {
    row.forEach((cell) => {
      if (cell.type === BattlefieldCellTypes.Clear) {
        const cellId = cell.id;
        clearCells.ids.push(cellId);
        clearCells.cells[cellId] = cell;
      }
    });
  });
  return clearCells;
};

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
    this.shipShape = 'line';
  }

  createFleet = () => {
    const fleet = ShipMainClasses.map((shipClass) => {
      if (!this.shipsList[shipClass]) {
        return [];
      }
      const shipsFromClass = Array.from(Array(this.shipsList[shipClass]), () => {
        const shipConstructors = getAvailableShips(shipClass, this.shipShape);
        const shipConstructor = getRandomElFromColl(shipConstructors);
        const shipId = uniqueId();
        const ship = shipConstructor(shipId);
        return ship;
      });
      return shipsFromClass;
    });
    this.fleet = flatten(fleet);
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
        if (cell.type === BattlefieldCellTypes.Clear) {
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
      const cell = this.battlefield[x][y];
      cell.shipId = shipId;
      cell.type = BattlefieldCellTypes.Ship;
    });

    const shipArea = calcArea(shipCoordsForWritingOnTheField);
    const areaForWritingOnTheField = shipArea.filter((item) => isValidCoords(item, 0, this.battlefield.length - 1));
    areaForWritingOnTheField.forEach(({ x, y}) => {
      const cell = this.battlefield[x][y];
      cell.type = BattlefieldCellTypes.Area;
    })
  }
}

export default BasicFleetLocationStrategy;
