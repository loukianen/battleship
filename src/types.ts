export type Coords = { x: number, y: number };

export type Field = Array<Array<number>>; // empty cell - 0, ship - any number > 0 as ship id;

export type FieldType = '3' | '5' | '7' | '10';

export interface Player {
  id: string,
  name: string,
  type: 'human' | 'robot',
}

export interface Human extends Player {
  type: 'human',
}

export interface Robot extends Player {
  type: 'robot',
  field: Field;
  fleet: [],
  enemyField: Field;
  shoot: () => Coords,
  handleShoot: (record: Record) => void,
  makeField: (fieldType: FieldType, shipsShapeType: ShipShape) => Field,
}

export type ShipClassType = 'fourDeck' | 'threeDeck' | 'doubleDeck' | 'oneDeck';

export type ShipsList = { [index: string]: number };

export type ShipOrientation = 'east' | 'north' | 'west' | 'south';

export type ShipShape = 'line' | 'any';

export type Shoot = {
  playerId: number,
  coords: Coords,
};

export type Record = [number, Coords | null, RecordText];

export type RecordText = 'offTarget' | 'wounded' | 'killed' | 'started' | 'won';
