import Ship from '../ship/ship';
import { Coords } from '../../types';
import { ShipClass, ShipOrientation } from '../../const';

export default class DoubleDeckShip extends Ship {
  constructor(id: number) {
    super(id);
    this.class = ShipClass.Double;
    this.orientationMapping = {
      [ShipOrientation.East]: ({ x, y }: Coords) : Coords[] => [{ x, y }, { x: x + 1, y }],
      [ShipOrientation.North]: ({ x, y }: Coords) : Coords[] => [{ x, y }, { x, y: y + 1 }],
    };
  }
}
