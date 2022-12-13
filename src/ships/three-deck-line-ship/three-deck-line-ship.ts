import Ship from '../ship/ship';
import { ShipClass, ShipOrientation } from '../../const';
import { Coords } from '../../types';

export default class ThreeDeckLineShip extends Ship {
  constructor(id: number) {
    super(id);
    this.class = ShipClass.Three;
    this.orientationMapping = {
      [ShipOrientation.East]: ({ x, y }: Coords) : Coords[] => [{ x: x - 1, y }, { x, y }, { x: x + 1, y }],
      [ShipOrientation.North]: ({ x, y }: Coords) : Coords[] => [{ x, y: y - 1 }, { x, y }, { x, y: y + 1 }],
    };
  }
}
