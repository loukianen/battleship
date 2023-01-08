import { FieldType } from "./types";

export enum BattlefieldType {
  EnemyField = 'enemy field',
  PlayerField = 'player field',
}

export enum CellType {
  Clear = 'cell',
  Ship = 'ship',
  SW = 'ship-wrong',
  Area = 'ship-area',
  AW = 'ship-area-wrong',
  Killed = 'killed ship',
  Shooted = 'shooted',
  TL = 'cell-top-left',
  T = 'cell-top',
  TR = 'cell-top-right',
  R = 'cell-right',
  BR = 'cell-bottom-right',
  B = 'cell-bottom',
  BL = 'cell-bottom-left',
  L = 'cell-left',
  I = 'cell-inside',
}

export enum FieldName {
  First = 'field1',
  Second = 'field2',
}

export enum GameErrorMessage {
  ShapeAny = 'An algorithm for checking the field with not line ships is not created yet',
  FieldType = 'Unknown field type',
  ShipIds = 'One ship has differant ids',
  ShipsCollection = 'Ships collection is not correct',
  ShipUniqueId = 'Ships has not unique id',
  ShipsPosition ='Ships position is not correct',
  ShouldGiveField = 'First player should give his field for beginning the battle',
  WrongCoords = 'Wrong coords recieved',
  WrongPlayer = 'Unknown player id',
  WrongSecondPlayer = 'Second player should be robot',
  WrongShoot = 'Did not menage to recieve a correct shoot',
}

export enum GameOption {
  Player1 = 'player1',
  Player2 = 'player2',
  FieldSize = 'fieldType',
  ShipType = 'shipType',
}

export enum GameState {
  NotStarted = 'not started',
  SettingFleet = 'setting fleet',
  Started = 'started',
  Finished = 'finished',
}

export enum GameType {
  WithAI = 'human-robot',
  Auto = 'robot-robot',
}

export enum LanguageType {
  En = 'en',
  Ru = 'ru',
}

export enum NameSpace {
  ActivePlayer = 'ACTIVE_PLAYER',
  AvailablePlayers = 'AVAILABLE_PLAYERS',
  Billboard = 'BILLBOARD',
  Dock = 'DOCK',
  Fields = 'FIELDS',
  Fleet = 'FLEET',
  GameOptions = 'GAME_OPTIONS',
  GameState = 'GAME_STATE',
  GameType = 'GAME_TYPE',
  Log = 'LOG',
  Players = 'PLAYERS',
  Score = 'SCORE',
  ShipInMove = 'SHIP_IN_MOVE',
}

export enum PlayerType {
  Human = 'human',
  Robot = 'robot',
}

export enum ShipShape {
  Any = 'any',
  Line = 'line',
}

export enum ShipClass {
  Four = 'fourDeck',
  Three = 'threeDeck',
  Double = 'doubleDeck',
  One = 'oneDeck',
}

export enum ShipOrientation {
  East = 'east',
  North = 'north',
  West = 'west',
  South = 'south',
}

export enum ShootResult {
  OffTarget = 'offTarget',
  Wounded = 'wounded',
  Killed = 'killed',
  Started = 'started',
  Won = 'won',
}

export const shipMainClasses : ShipClass[] = [ShipClass.Four, ShipClass.Three, ShipClass.Double, ShipClass.One];

export const shipOrientations: ShipOrientation[] = [ShipOrientation.East, ShipOrientation.North, ShipOrientation.West, ShipOrientation.South];

export const lineShipOrientations: ShipOrientation[] =  [ShipOrientation.East, ShipOrientation.North];

export const fieldTypes: FieldType[] = ['3', '5', '7', '10'];

export const shipTypes: ShipShape[] = [ShipShape.Line];
