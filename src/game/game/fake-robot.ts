import { PlayerTypes } from '../../const';
import { BattleFieldCell, Coords, Robot, ShipShape, ShipsList } from '../../types';

export default class FakeRobot implements Robot {
  id;
  name;
  type: PlayerTypes.Robot;
  enemyShipsList: ShipsList;
  enemyField: BattleFieldCell[][];
  woundedEnemyShip: Coords[];
  shipShape: ShipShape;

  constructor() {
    this.id = 'fakeRobot';
    this.name = 'fake robot';
    this.type = PlayerTypes.Robot;
    this.enemyShipsList = {};
    this.enemyField = [];
    this.woundedEnemyShip = [];
    this.shipShape = 'line';
  }

  shoot() {
    return { x: 0, y: 0 };
  }

  handleShoot() {}

  generateBattlefield() : Array<Array<number>> {
    return [];
  }
}
