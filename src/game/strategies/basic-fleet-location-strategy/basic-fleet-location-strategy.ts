import flatten from 'lodash-ts/flatten';
import getAvailableShips from '../../../ships/get-available-ships';
import { getRandomElFromColl, uniqueId } from '../../../services/utils';
import { Coords, Field, ShipInterface, ShipShape, ShipsList } from '../../../types';
import { ShipMainClasses } from '../../../const';
import Ship from '../../../ships/ship/ship';

const createBattlefield = (field: Field) => field.map((row, x) => row.map((val, y) => {
  const id = uniqueId();
  const type = 'clear';
  const shipId = null;
  const coords: Coords = { x, y };
  return { id, coords, type, shipId };
}));

const getClearCells = (battlefield: BattleFieldCell[][]) => {
  const clearCells : { ids: Array<number>, cells: { [i: string | number]: BattleFieldCell } } = { ids: [], cells: {} };
  battlefield.forEach((row) => {
    row.forEach((cell) => {
      if (cell.type === 'clear') {
        const cellId = cell.id;
        clearCells.ids.push(cellId);
        clearCells.cells[cellId] = cell;
      }
    });
  });
  return clearCells;
};

type BattleFieldCell = { id: number, type: string, shipId: number | null, coords: Coords };

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
    return this.battlefield;
  }

  getClearCells() {
    const clearCells : { ids: Array<number>, cells: { [i: string | number]: BattleFieldCell } } = { ids: [], cells: {} };
    return this.battlefield.forEach((row) => {
      row.forEach((cell) => {
        if (cell.type === 'clear') {
          const cellId = cell.id;
          clearCells.ids.push(cellId);
          clearCells.cells[cellId] = cell;
        }
      });
    });
  }

  putFleetOnTheField() {

  }

  putShipOnTheField(ship: Ship) {
    const clearCells = getClearCells(this.battlefield);
    const iter = () => {
      const mainPointId = getRandomElFromColl(clearCells.ids);
    }
  }
}

export default BasicFleetLocationStrategy;
