import Ship from '../ship/ship';

export default class OneDeckShip extends Ship {
  constructor(id: string) {
    super(id);
    this.class = 'oneDeck';
  }
}
