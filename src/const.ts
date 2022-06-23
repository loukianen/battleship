import { ShipClassType, ShipOrientation } from "./types";

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
}

export enum PlayerTypes {
  Human = 'human',
  Robot = 'robot',
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

export const fieldTypes = ['3', '5', '7', '10'];
