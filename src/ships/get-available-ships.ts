import OneDeckShip from './one-deck-ship/one-deck-ship';
import DoubleDeckShip from './double-deck-ship/double-deck-ship';
import ThreeDeckLineShip from './three-deck-line-ship/three-deck-line-ship';
import FourDeckLineShip from './four-deck-line-ship/four-deck-line-ship';
import { ShipClassType, ShipInterface, ShipShape } from '../types';

type FunctionConstractShip = (id: number) => ShipInterface;

const constractOneDeckShip : FunctionConstractShip = (id) => new OneDeckShip(id);
const constractDoubleDeckShip : FunctionConstractShip = (id) => new DoubleDeckShip(id);
const constractThreeDeckLineShip : FunctionConstractShip = (id) => new ThreeDeckLineShip(id);
const constractFourDeckLineShip : FunctionConstractShip = (id) => new FourDeckLineShip(id);

const mapping = {
  oneDeck: {
    line: [constractOneDeckShip],
    any: [constractOneDeckShip],
  },
  doubleDeck: {
    line: [constractDoubleDeckShip],
    any: [constractDoubleDeckShip],
  },
  threeDeck: {
    line: [constractThreeDeckLineShip],
    any: [constractThreeDeckLineShip],
  },
  fourDeck: {
    line: [constractFourDeckLineShip],
    any: [constractFourDeckLineShip],
  },
};

type getAvailableShipsType = (c: ShipClassType, s: ShipShape) => FunctionConstractShip[];

const getAvailableShips : getAvailableShipsType = (shipClass, shipShape) => mapping[shipClass][shipShape];

export default getAvailableShips;
