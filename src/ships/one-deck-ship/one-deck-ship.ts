import Ship from '../ship/ship';

export default class OneDeckShip extends Ship {
  constructor(id: number) {
    super(id);
    this.class = 'oneDeck';
  }
}
