import { Coords } from '../../types';
import Ship from '../ship/ship';

export default class OneDeckShip extends Ship {
  constructor(id: number) {
    super(id);
    this.class = 'oneDeck';
    this.orientationMapping = {
      east: ({ x, y }: Coords) : Coords[] => [{ x, y }],
    };
  }
}
