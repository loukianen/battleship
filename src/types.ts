import store from './store/store';
import { CellType, PlayerType, ShipShape, ShipClass, ShipOrientation, ShootResult, FieldName } from './const';
import { FieldTextKey } from './locales/types';

export type AppDispatch = typeof store.dispatch;

export type BattleFieldCell = Omit<Cell, 'defaultType' | 'value'>;

export type Cell = { id: number, shipId: number | null, type: CellType, defaultType: CellType, value: FieldTextKey | number | null, coords: Coords }; // UI-cell

export type Coords = { x: number, y: number };

export type Field = Array<Array<number>>; // empty cell - 0, ship - any number > 0 as ship id;

export type FieldChangeDataType = { coords: Coords, options: { type: CellType, value?: FieldTextKey } }[];
export type FieldsPayloadDataType = { [FieldName.First]?: FieldChangeDataType, [FieldName.Second]?: FieldChangeDataType };

export type FieldType = '3' | '5' | '7' | '10';

export interface Human extends Player {
  type: PlayerType.Human,
}

export type InfoKey = ShootResult | NotShootResultInfokey;
export type NotShootResultInfokey = 'makeSetting' | 'setFleet' | 'killEnemy' | 'putYourShips';
export type InfoState = { message: InfoKey, player: PlayerIndex | null };
export type InfoStatePayload = { message: InfoKey, player?: PlayerIndex };

export type LogRecord = [number, ...Record];

export type OptionsDataType = { players: Player[], fieldType: FieldType, shipType: ShipShape };

type OrientationMappingType = {
  [index: string]: Function,
};

export interface Player {
  id: string,
  name: string,
  type: PlayerType,
}

export type PlayersDataType = { user: Player, robots: Player[] };

export type PlayerIndex = 0 | 1;

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

export type Record = [PlayerIndex, Coords | null, ShootResult];

export type UserFleet = {
  [ShipClass.One]: ShipInterface[],
  [ShipClass.Double]: ShipInterface[],
  [ShipClass.Three]: ShipInterface[],
  [ShipClass.Four]: ShipInterface[],
};
