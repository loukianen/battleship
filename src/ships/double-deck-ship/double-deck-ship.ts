import Ship from '../ship/ship';
import { Coords } from '../../types';

export default class DoubleDeckShip extends Ship {
  constructor(id: string) {
    super(id);
    this.class = 'doubleDeck';
    this.orientationMapping = {
      east: ({ x, y }: Coords) : Coords[] => [{ x, y }, { x: x + 1, y }],
      north: ({ x, y }: Coords) : Coords[] => [{ x, y }, { x, y: y + 1 }],
    };
  }
}
