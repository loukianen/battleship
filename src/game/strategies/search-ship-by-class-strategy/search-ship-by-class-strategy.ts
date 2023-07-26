import FinishOffShipStrategy from '../finish-off-ship-strategy/finish-off-ship-strategy';
import getAvailableShips from '../../../ships/get-available-ships';
import { BattleFieldCell, Coords, ShipInterface, ShootingStrategy } from '../../../types';
import { CellType, ShipClass, ShipShape } from '../../../const';
import { calcArea, getClearCells, getRandomElFromColl, isValidCoords, isValidShipCoords } from '../../../services/utils';

class SearchShipByClassStrategy implements ShootingStrategy {
  battlefield;
  woundedShip;
  shipShape;
  shipClass;
  ships: ShipInterface[];

  constructor(battlefield: BattleFieldCell[][], woundedShipCoords: Coords[], shipShape: ShipShape, shipClass: ShipClass){
    this.battlefield = battlefield;
    this.woundedShip = woundedShipCoords;
    this.shipShape = shipShape;
    this.shipClass = shipClass;
    this.ships = [];
  }

  getPriorityCellsCoords() {
    const allPosibleForShipCellIds = new Map();
    const allPosibleForShipCells: { ids: number[], cells: { [id: string]: BattleFieldCell } } = { ids: [], cells: {} };
    this.ships = getAvailableShips(this.shipClass, this.shipShape).map((shipConstructor, i) => shipConstructor(i));

    this.battlefield.forEach((row) => {
      row.forEach((cell) => {
        if (cell.type === CellType.Clear) {
          const shipsCoords = this.getShipCoords(cell.coords);
          shipsCoords.forEach(({x, y}) => {
            const curCell = this.battlefield[y][x];
            if (allPosibleForShipCellIds.has(curCell.id)) {
              allPosibleForShipCellIds.set(curCell.id, allPosibleForShipCellIds.get(curCell.id) + 1);
            } else {
              allPosibleForShipCellIds.set(curCell.id, 1);
              allPosibleForShipCells.ids.push(curCell.id);
              allPosibleForShipCells.cells[curCell.id] = curCell;
            }
          });
        }
      });
    });
    let priorityCellCoords: Coords[] = [];
    let maxValue: number = 0;
    allPosibleForShipCellIds.forEach((value, cellId) => {
      if (value === maxValue) {
        priorityCellCoords.push(allPosibleForShipCells.cells[cellId].coords);
      }
      if (value > maxValue) {
        maxValue = value;
        priorityCellCoords = [allPosibleForShipCells.cells[cellId].coords];
      }
    });

    return priorityCellCoords;
  }

  getShipCoords(coords: Coords) {
    return this.ships.reduce((acc: Coords[], ship: ShipInterface) => {
      ship.setCoords(coords);
      const shipOrientationVariants = ship.getOrientationVariants();
      shipOrientationVariants.forEach((orientation) => {
        ship.setOrientation(orientation);
        ship.getCoords().forEach((shipCoords) => {
          if (isValidShipCoords(this.battlefield, shipCoords)) {
            acc.push(shipCoords);
          }
        });
      });
      return acc;
    }, []);
  }
  
  getShoot() {
    if(this.woundedShip.length > 0) {
      const finishOffShipStrategy = new FinishOffShipStrategy(this.battlefield, this.woundedShip, this.shipShape);
      return finishOffShipStrategy.getShoot();
    }
    return this.makeShoot();
  }
  
  makeShoot() {
    const priorityCellCoords = this.getPriorityCellsCoords();
    return getRandomElFromColl(priorityCellCoords);
  }

  putShipOnTheField(ship: ShipInterface) {
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
};

export default SearchShipByClassStrategy;
