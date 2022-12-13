import { Human } from '../../../types';
import { PlayerType } from '../../../const';

export default class SinglePlayer implements Human {
  id;
  name;
  type: PlayerType.Human;

  constructor() {
    this.id = 'user';
    this.name = 'user';
    this.type = PlayerType.Human;
  }
};
