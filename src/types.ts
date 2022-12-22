import store from './store/store';
import { CellType, PlayerType, ShipShape, ShipClass, ShipOrientation, ShootResult } from './const';

export type AppDispatch = typeof store.dispatch;

export type BattleFieldCell = Omit<Cell, 'defaultType' | 'value'>;

export type Cell = { id: number, shipId: number | null, type: CellType, defaultType: CellType, value: string | number | null, coords: Coords }; // UI-cell

export type Coords = { x: number, y: number };

export type Field = Array<Array<number>>; // empty cell - 0, ship - any number > 0 as ship id;

export type FieldsPayloadDataType = { field: string };

export type FieldType = '3' | '5' | '7' | '10';

export interface Human extends Player {
  type: PlayerType.Human,
}

export type LogRecord = [number, ...Record];

export type OptionsDataType = { players: Player[], fieldType: FieldType, shipType: ShipShape };
export type OptionsPayloadDataType = { players?: Player[], fieldType?: FieldType, shipType?: ShipShape };

type OrientationMappingType = {
  [index: string]: Function,
};

export interface Player {
  id: string,
  name: string,
  type: PlayerType,
}

export type PlayersDataType = { user: Player, robots: Player[] };

export interface Robot extends Player {
  type: PlayerType.Robot,
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
  class: ShipClass | null;
  shape: ShipShape;
  orientation: ShipOrientation;
  orientationMapping: OrientationMappingType;
  getCoords: () => Coords[];
  getId: () => number;
  getClass: () => ShipClass | null;
  calcCoords: (mainPoint: Coords) => Coords[];
  setCoords: (mainPoint: Coords) => void;
  setOrientation: (orientation: ShipOrientation) => void;
  changeOrientation: () => void;
  getOrientationVariants: () => ShipOrientation[];
}

export type ShipsList = { [index: string]: number };

export type Shoot = {
  playerId: number,
  coords: Coords,
};

export type State = ReturnType<typeof store.getState>;

export type Record = [number, Coords | null, ShootResult];
