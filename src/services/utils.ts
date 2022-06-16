import { Field, FieldType, ShipsList } from "../types";

export const generateField = (size: FieldType) : Field => {
  const fieldSize = Number(size);
  return Array(fieldSize).fill(Array(fieldSize).fill(0));
};

export const getEnemy = (index: number) : number => index === 0 ? 1 : 0;

export const getRandomElFromColl = (arr: Array<number>) => {
  const index = Math.round(Math.random() * (arr.length - 1));
  return arr[index];
};

const shipListMapping : { [index: string]: ShipsList} = {
  3: { oneDeck: 1 },
  5: { oneDeck: 2, doubleDeck: 1 },
  7: { oneDeck: 3, doubleDeck: 2, threeDeck: 1 },
  10: { oneDeck: 4, doubleDeck: 3, threeDeck: 2, fourDeck:1 },
};

export const generateShipsList = (size: FieldType) : ShipsList => shipListMapping[size];


