import BasicFleetLocationStrategy from '../../strategies/basic-fleet-location-strategy/basic-fleet-location-strategy';
import ShootingOnClearCellsStrategy from '../../strategies/shooting-on-clear-cells-strategy/shooting-on-clear-cells-strategy';
import { createBattlefield } from '../../../services/utils';
import { BattleFieldCell, Coords, Field, Record, Robot, ShipShape, ShipsList } from '../../../types';
import { GameErrorMessages, PlayerTypes } from '../../../const';

export default class JackSparrow implements Robot {
  id;
  name;
  type: PlayerTypes.Robot;
  enemyShipsList: ShipsList;
  enemyField: BattleFieldCell[][];
  shipShape: ShipShape;
  woundedEnemyShip: Coords[];

  constructor() {
    this.id = 'jack';
    this.name = 'Jack Sparrow';
    this.type = PlayerTypes.Robot;
    this.enemyShipsList = {};
    this.enemyField = [];
    this.shipShape = 'line';
    this.woundedEnemyShip = [];
  }

  handleShoot(record: Record) {}

  generateBattlefield(field: Field, shipList: ShipsList, shipsShapeType?: ShipShape) {
    if (shipsShapeType) {
      this.shipShape = shipsShapeType;
    }
    this.enemyShipsList = shipList;
    this.enemyField = createBattlefield(field);

    const fleetLocationStrategy = this.getFleetLocationStrategy();
    return fleetLocationStrategy.getBattleField(field, shipList, this.shipShape);
  }

  getFleetLocationStrategy() {
    return new BasicFleetLocationStrategy();
  }

  getStrategy() {
    const currentStrategy = new ShootingOnClearCellsStrategy(this.enemyField, this.woundedEnemyShip, this.shipShape);
    return currentStrategy;
  }

  shoot() : Coords {
    const strategy = this.getStrategy();
    const shoot = strategy.getShoot();
    if (!shoot) {
      throw new Error(GameErrorMessages.WrongShoot);
    }
    return shoot;
  }
};
