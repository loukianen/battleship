import { PlayerType, ShipShape } from '../../const';
import { BattleFieldCell, Coords, Robot, ShipsList } from '../../types';

export default class FakeRobot implements Robot {
  id;
  name;
  type: PlayerType.Robot;
  enemyShipsList: ShipsList;
  enemyField: BattleFieldCell[][];
  woundedEnemyShip: Coords[];
  shipShape: ShipShape;

  constructor() {
    this.id = 'fakeRobot';
    this.name = 'fake robot';
    this.type = PlayerType.Robot;
    this.enemyShipsList = {};
    this.enemyField = [];
    this.woundedEnemyShip = [];
    this.shipShape = ShipShape.Line;
  }

  shoot() {
    return { x: 0, y: 0 };
  }

  handleShoot() {}

  generateBattlefield() : Array<Array<number>> {
    return [];
  }
}
