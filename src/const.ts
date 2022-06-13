import { ShipOrientation } from "./types";

export enum GameErrorMessages {
  ShapeAny = 'An algorithm for checking the field with not line ships is not created yet',
  FieldType = 'Unknown field type',
  ShipIds = 'One ship has differant ids',
  ShipsCollection = 'Ships collection is not correct',
  ShipUniqueId = 'Ships has not unique id',
  ShipsPosition ='Ships position is not correct',
};

export const ShipOrientations: ShipOrientation[] = ['east', 'north', 'west', 'south'];

export const LineShipOrientations: ShipOrientation[] =  ['east', 'north'];

export const fieldTypes = ['3', '5', '7', '10'];
