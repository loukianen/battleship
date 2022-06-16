import { Human } from '../../../types';
import { PlayerTypes } from '../../../const';

export default class SinglePlayer implements Human {
  id;
  name;
  type: PlayerTypes.Human;

  constructor() {
    this.id = 'user';
    this.name = 'user';
    this.type = PlayerTypes.Human;
  }
};
