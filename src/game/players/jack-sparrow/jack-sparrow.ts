import BasicFleetLocationStrategy from '../../strategies/basic-fleet-location-strategy/basic-fleet-location-strategy';
import ShootingOnClearCellsStrategy from '../../strategies/shooting-on-clear-cells-strategy/shooting-on-clear-cells-strategy';
import { calcArea, createBattlefield, isValidCoords } from '../../../services/utils';
import { BattleFieldCell, Coords, Field, Record, Robot, ShipShape, ShipsList } from '../../../types';
import { BattlefieldCellTypes, GameErrorMessages, PlayerTypes, ShootResults } from '../../../const';

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

  processHit(coords: Coords) {
    const { x, y } = coords;
    this.enemyField[x][y].type = BattlefieldCellTypes.Killed;
    this.woundedEnemyShip.push(coords);
  }

  makrCellAsShooted(coords: Coords) {
    const { x, y } = coords;
    this.enemyField[x][y].type = BattlefieldCellTypes.Shooted;
  }

  handleShoot(record: Record) {
    const [, coords, message] = record;
    if (!coords) return;
    if (message === ShootResults.OffTarget) {
      this.makrCellAsShooted(coords);
    }
    if (message === ShootResults.Wounded) {
      this.processHit(coords);
    }
    if (message === ShootResults.Killed) {
      this.processHit(coords);
      const killedShipArea = calcArea(this.woundedEnemyShip)
        .filter((item) => isValidCoords(item, 0, this.enemyField.length - 1));
      killedShipArea.forEach((item) => {
        this.makrCellAsShooted(item);
      });
      this.woundedEnemyShip = [];
    }
  }

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
