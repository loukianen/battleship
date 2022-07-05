import { FieldType, ShipClassType, ShipOrientation } from "./types";

export enum BattlefieldCellTypes {
  Clear = 'clear',
  Ship = 'ship',
  Area = 'area',
  Killed = 'killed ship',
  Shooted = 'shooted',
}

export enum GameErrorMessages {
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

export enum NameSpace {
  ActivePlayer = 'ACTIVE_PLAYER',
  AvailablePlayers = 'AVAILABLE_PLAYERS',
  Billboard = 'BILLBOARD',
  Fields = 'FIELDS',
  Fleet = 'FLEET',
  GameOptions = 'GAME_OPTIONS',
  GameState = 'GAME_STATE',
  Language = 'LANGUAGE',
  Log = 'LOG',
  Players = 'PLAYERS',
  Score = 'SCORE',
  ShipInMove = 'SHIP_IN_MOVE',
}

export enum PlayerTypes {
  Human = 'human',
  Robot = 'robot',
}

export enum ShipShapes {
  Any = 'any',
  Line = 'line',
}

export enum ShootResults {
  OffTarget = 'offTarget',
  Wounded = 'wounded',
  Killed = 'killed',
  Started = 'started',
  Won = 'won',
}

export const ShipMainClasses : ShipClassType[] = ['fourDeck', 'threeDeck', 'doubleDeck', 'oneDeck'];

export const ShipOrientations: ShipOrientation[] = ['east', 'north', 'west', 'south'];

export const LineShipOrientations: ShipOrientation[] =  ['east', 'north'];

export const fieldTypes: FieldType[] = ['3', '5', '7', '10'];
