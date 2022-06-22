import Ship from '../ship/ship';
import { Coords } from '../../types';

export default class ThreeDeckLineShip extends Ship {
  constructor(id: number) {
    super(id);
    this.class = 'threeDeck';
    this.orientationMapping = {
      east: ({ x, y }: Coords) : Coords[] => [{ x: x - 1, y }, { x, y }, { x: x + 1, y }],
      north: ({ x, y }: Coords) : Coords[] => [{ x, y: y - 1 }, { x, y }, { x, y: y + 1 }],
    };
  }
}
