import { Coords } from '../../types';
import { ShipClass, ShipOrientation } from '../../const';
import Ship from '../ship/ship';

export default class OneDeckShip extends Ship {
  constructor(id: number) {
    super(id);
    this.class = ShipClass.One;
    this.orientationMapping = {
     [ShipOrientation.East]: ({ x, y }: Coords) : Coords[] => [{ x, y }],
    };
  }
}
