import Ship from '../ship/ship';
import { ShipClass, ShipOrientation } from '../../const';
import { Coords } from '../../types';

export default class FourDeckLineShip extends Ship {
  constructor(id: number) {
    super(id);
    this.class = ShipClass.Four;
    this.orientationMapping = {
      [ShipOrientation.East]: ({ x, y }: Coords) : Coords[] => [{ x: x - 1, y }, { x, y }, { x: x + 1, y }, { x: x + 2, y }],
      [ShipOrientation.North]: ({ x, y }: Coords) : Coords[] => [{ x, y: y - 1 }, { x, y }, { x, y: y + 1 }, { x, y: y + 2 }],
    };
  }
}
