import OneDeckShip from './one-deck-ship/one-deck-ship';
import DoubleDeckShip from './double-deck-ship/double-deck-ship';
import ThreeDeckLineShip from './three-deck-line-ship/three-deck-line-ship';
import FourDeckLineShip from './four-deck-line-ship/four-deck-line-ship';
import { ShipClass, ShipShape } from '../const';
import { ShipInterface } from '../types';

type FunctionConstractShip = (id: number) => ShipInterface;

const constractOneDeckShip : FunctionConstractShip = (id) => new OneDeckShip(id);
const constractDoubleDeckShip : FunctionConstractShip = (id) => new DoubleDeckShip(id);
const constractThreeDeckLineShip : FunctionConstractShip = (id) => new ThreeDeckLineShip(id);
const constractFourDeckLineShip : FunctionConstractShip = (id) => new FourDeckLineShip(id);

const mapping = {
  [ShipClass.One]: {
    [ShipShape.Line]: [constractOneDeckShip],
    [ShipShape.Any]: [constractOneDeckShip],
  },
  [ShipClass.Double]: {
    [ShipShape.Line]: [constractDoubleDeckShip],
    [ShipShape.Any]: [constractDoubleDeckShip],
  },
  [ShipClass.Three]: {
    [ShipShape.Line]: [constractThreeDeckLineShip],
    [ShipShape.Any]: [constractThreeDeckLineShip],
  },
  [ShipClass.Four]: {
    [ShipShape.Line]: [constractFourDeckLineShip],
    [ShipShape.Any]: [constractFourDeckLineShip],
  },
};

type getAvailableShipsType = (c: ShipClass, s: ShipShape) => FunctionConstractShip[];

const getAvailableShips : getAvailableShipsType = (shipClass, shipShape) => mapping[shipClass][shipShape];

export default getAvailableShips;
