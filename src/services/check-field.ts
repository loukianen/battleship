import isEmpty from 'lodash-ts/isEmpty';
import isEqual from 'lodash-ts/isEqual';
import sum from 'lodash-ts/sum';
import { generateShipsList } from './utils';
import { GameErrorMessages, fieldTypes } from '../const';
import { Field, FieldType, ShipsList, ShipShape, Coords, ShipClassType } from "../types";

const checkFieldSize = (field: Field) => {
  const fieldType = String(field.length);

  if (!fieldTypes.includes(fieldType)) {
    throw new Error(GameErrorMessages.FieldType);
  }

  field.forEach((row) => {
    if (row.length !== field.length) {
      throw new Error(GameErrorMessages.FieldType);
    }
  });
};

const shipsClassMapping : { [index: number | string]: ShipClassType } = {
  1: 'oneDeck', 2: 'doubleDeck', 3: 'threeDeck', 4: 'fourDeck',
};

const getShipOptions = (field: Field, point: Coords) : { shipClass: ShipClassType, ids: number[] } => {
  let deckCount = 1;
  const ids : number[] = [];
  const iter = (currentPoint: Coords) : ShipClassType => {
    const { x, y } = currentPoint;
    ids.push(field[x][y]);
    let nextPoint = {};
    if (field[x + 1] && field[x + 1][y] > 0) {
      nextPoint = {x: x + 1, y};
    }
    if (field[x][y + 1] > 0) {
      nextPoint = {x, y: y + 1};
    }
    if (isEmpty(nextPoint)) {
      return shipsClassMapping[deckCount];
    }
    deckCount += 1;
    return iter(nextPoint as Coords);
  };
  const shipClass = iter(point);
  return { shipClass, ids };
};


const checkShips =  (field: Field) => {
  const fieldType = String(field.length) as FieldType;
  const shipsList = generateShipsList(fieldType);
  const shipsAmount = sum(Object.values(shipsList));

  const shipsCount : ShipsList = {};
  const shipIds = new Set();

  field.forEach((row, x) => {
    row.forEach((item, y) => {
      const isItemShip = item > 0;
      const isShipOnTheLeft = field[x][y - 1];
      const isShipOnTheTop = field[x - 1] && field[x - 1][y] > 0;
      const isItemBeginidOfShip = !isShipOnTheLeft && !isShipOnTheTop;

      if (isItemShip && isItemBeginidOfShip) {
        const { shipClass, ids } = getShipOptions(field, { x, y });

        const hasShipPartsTheSameId = ids.every((id) => id === ids[0]);
        if (!hasShipPartsTheSameId) {
          throw new Error(GameErrorMessages.ShipIds);
        }
        shipIds.add(ids[0]);
        if (shipsCount[shipClass]) {
          shipsCount[shipClass] += 1;
        } else {
          shipsCount[shipClass] = 1;
        }
      }
    });
  });

  const isShipsCollectionCorrect = isEqual(shipsList, shipsCount);
  if (!isShipsCollectionCorrect) {
    throw new Error(GameErrorMessages.ShipsCollection);
  }

  const isEveryShipHasUniqueId = shipsAmount === shipIds.size;
  if (!isEveryShipHasUniqueId) {
    throw new Error(GameErrorMessages.ShipUniqueId);
  }
};

const checkShipsPosition = (field: Field) => {
  for (let col = 0; col < field.length; col += 1) {
    for (let row = 1; row < field.length; row += 1) {
      if (field[row][col]) {
        if (field[row - 1][col + 1] || field[row - 1][col - 1]) {
          throw new Error(GameErrorMessages.ShipsPosition);
        }
      }
    }
  }
};

const checkField = (field: Field, shipShape: ShipShape = 'line') => {
  try {
    if (shipShape !== 'line') {
      throw new Error(GameErrorMessages.ShapeAny);
    }
    
    checkFieldSize(field);
    checkShips(field);
    checkShipsPosition(field);
    return true;
  } catch(e: ReturnType<Error>) {
    throw e;
  }
};

export default checkField;
