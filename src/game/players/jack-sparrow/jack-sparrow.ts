import BasicFleetLocationStrategy from '../../strategies/basic-fleet-location-strategy/basic-fleet-location-strategy';
import { createBattlefield } from '../../../services/utils';
import { BattleFieldCell, Coords, Field, Record, Robot, ShipShape, ShipsList } from '../../../types';
import { PlayerTypes } from '../../../const';

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

  shoot() {
    return { x: 0, y: 0 };
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
};
