import flatten from 'lodash-ts/flatten';
import isArray from 'lodash-ts/isArray';
import isEmpty from 'lodash-ts/isEmpty';
import isEqual from 'lodash-ts/isEqual';
import { BattleFieldCell, Coords, Field, FieldType, ShipsList } from "../types";
import { BattlefieldCellTypes } from '../const';

const isArrayNotIncludesObject = <Type>(arr: Type[], object: Type) : boolean => arr.every((item) => !isEqual(item, object));

export const uniq = <Type>(arr: Type[]) : Type[] => {
  const uniqItems : Type[] = [];
  arr.forEach((item) => {
    if (isArrayNotIncludesObject(uniqItems, item)) {
      uniqItems.push(item);
    }
  });
  return uniqItems;
};

const getDifference = <Type>(arr1: Type[], arr2: Type[]) : Type[] => {
  const diff1 : Type[] = [];
  arr1.forEach((item1: Type) => {
    if (isArrayNotIncludesObject(arr2, item1)) {
      diff1.push(item1);
    }
  });
  const diff2 : Type[] = [];
  arr2.forEach((item2: Type) => {
    if (isArrayNotIncludesObject(arr1, item2)) {
      diff2.push(item2);
    }
  });
  const diff = uniq([...diff1, ...diff2]);
  return diff;
};

const pointAreaMapping = {
  with: (coords: Coords) : Coords[] => [...pointAreaMapping.without(coords), ...pointAreaMapping.corners(coords)],
  without: ({ x, y }: Coords) : Coords[] => {
    const res = [];
    res.push({ x, y: y - 1 });
    res.push({ x: x - 1, y });
    res.push({ x, y });
    res.push({ x: x + 1, y });
    res.push({ x, y: y + 1 });
    return res;
  },
  corners: ({ x, y }: Coords) : Coords[] => {
    const res = [];
    res.push({ x: x - 1, y: y -1 });
    res.push({ x: x - 1, y: y + 1 });
    res.push({ x, y });
    res.push({ x: x + 1, y: y - 1 });
    res.push({ x: x + 1, y: y + 1 });
    return res;
  },
};

type GetPointAreaMappingProperty = 'with' | 'without' | 'corners';

const getPointsArea = (coords: Coords[], corners: GetPointAreaMappingProperty) : Coords[] => {
  const pointsAreas = coords.map((point) => pointAreaMapping[corners](point));
  const areaWithShipCoords = uniq(flatten(pointsAreas));
  const area = getDifference(areaWithShipCoords, coords);
  return area;
}

export const calcArea = (data: Coords[] | Coords, corners: GetPointAreaMappingProperty = 'with') => {
  const coords = isArray(data) ? data : [data];
  let area: Coords[];
  if (corners === 'corners') {
    const areaWithCorners = getPointsArea(coords, 'with');
    const calculatedAreaWithoutCorners = getPointsArea(coords, 'without');
    area = getDifference(areaWithCorners, calculatedAreaWithoutCorners);
  } else {
    area =  getPointsArea(coords, corners);
  }
  return area; 
};

export const generateField = (size: FieldType) : Field => {
  const fieldSize = Number(size);
  return Array(fieldSize).fill(Array(fieldSize).fill(0));
};

export const getEnemy = (index: number) : number => index === 0 ? 1 : 0;

export const getRandomElFromColl = <Type>(arr: Array<Type>) : Type => {
  const index = Math.round(Math.random() * (arr.length - 1));
  return arr[index];
};

const shipListMapping : { [index: string]: ShipsList} = {
  3: { oneDeck: 1 },
  5: { oneDeck: 2, doubleDeck: 1 },
  7: { oneDeck: 3, doubleDeck: 2, threeDeck: 1 },
  10: { oneDeck: 4, doubleDeck: 3, threeDeck: 2, fourDeck:1 },
};

export const createBattlefield = (field: Field) => field.map((row, x) => row.map((val, y) => {
  const id = uniqueId();
  const type = BattlefieldCellTypes.Clear;
  const shipId = null;
  const coords: Coords = { x, y };
  return { id, coords, type, shipId };
}));

export const generateShipsList = (size: FieldType) : ShipsList => shipListMapping[size];

export const getClearCells = (battlefield: BattleFieldCell[][]) => {
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

export const isValidCoords = (coords: Coords | Coords[], minValue: number, maxValue: number) => { // coords [{}, {}] or {}
  if (isEmpty(coords)) {
    return false;
  }
  const coordsList = isArray(coords) ? coords : [coords];
  return coordsList
    .every(({ x, y }) => (x >= minValue && x <= maxValue && y >= minValue && y <= maxValue));
};

export const isValidShipCoords = (field: BattleFieldCell[][], shipCoords: Coords | Coords[]) => {
  const coords = isArray(shipCoords) ? shipCoords : [shipCoords];
  const maxValue = field.length - 1;
  if (!isValidCoords(coords, 0, maxValue)) {
    return false;
  }
  return coords.every(({ x, y }) => {
    const cellType = field[x][y].type;
    return cellType === BattlefieldCellTypes.Clear;
  });
};

export const uniqueId = Object.assign(
  () => {
    uniqueId.count += 1;
    return uniqueId.count;
  },
  { count: 0 },
);
