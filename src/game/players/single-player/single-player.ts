import { Player } from "../../types";

export default class SinglePlayer implements Player {
  id;
  name;
  type: 'human' | 'robot';

  constructor() {
    this.id = 'player';
    this.name = 'user';
    this.type = 'human';
  }
};
