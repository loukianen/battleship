export type BattleFieldCell = { id: number, type: string, shipId: number | null, coords: Coords };

export type Coords = { x: number, y: number };

export type Field = Array<Array<number>>; // empty cell - 0, ship - any number > 0 as ship id;

export type FieldType = '3' | '5' | '7' | '10';

export interface Player {
  id: string,
  name: string,
  type: 'human' | 'robot',
}

export type PlayerDataType = Pick<Player, 'id' | 'name'> | {};
export type PlayersDataType = { user: PlayerDataType, robots: PlayerDataType[] };

export interface Human extends Player {
  type: 'human',
}

type OrientationMappingType = {
  [index: string]: Function,
};

export interface Robot extends Player {
  type: 'robot',
  enemyShipsList: ShipsList,
  enemyField: BattleFieldCell[][];
  woundedEnemyShip: Coords[];
  shipShape: ShipShape;
  shoot: () => Coords,
  handleShoot: (record: Record) => void,
  generateBattlefield: (field: Field, shipList: ShipsList, shipsShapeType: ShipShape) => Field,
}

export interface ShipInterface {
  id: number;
  coords: Coords[];
  mainPoint: Coords | null;
  class: ShipClassType | null;
  shape: ShipShape;
  orientation: ShipOrientation;
  orientationMapping: OrientationMappingType;
  getCoords: () => Coords[];
  getId: () => number;
  getClass: () => ShipClassType | null;
  calcCoords: (mainPoint: Coords) => Coords[];
  setCoords: (mainPoint: Coords) => void;
  setOrientation: (orientation: ShipOrientation) => void;
  changeOrientation: () => void;
  getOrientationVariants: () => ShipOrientation[];
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
