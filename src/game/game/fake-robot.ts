import { PlayerTypes } from '../../const';
import { Field, Robot } from '../../types';

export default class FakeRobot implements Robot {
  id;
  name;
  type: PlayerTypes.Robot;
  field: Field;
  fleet: [];
  enemyField: Field;

  constructor() {
    this.id = 'fakeRobot';
    this.name = 'fake robot';
    this.type = PlayerTypes.Robot;
    this.field = [];
    this.fleet = [];
    this.enemyField = [];
  }

  shoot() {
    return { x: 0, y: 0 };
  }

  handleShoot() {}

  makeField() : Array<Array<number>> {
    return [];
  }
}
