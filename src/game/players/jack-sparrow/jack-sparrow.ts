import { Field, Player } from "../../types";

export default class JackSparrow implements Player {
  id;
  name;
  type: 'human' | 'robot';
  field: Field;
  enemyField: Field;

  constructor() {
    this.id = 'jack';
    this.name = 'Jack Sparrow';
    this.type = 'robot';
    this.field = null;
    this.enemyField = null;
  }

  getShoot() {}

  handleShoot() {}

  makeField() {}
};
