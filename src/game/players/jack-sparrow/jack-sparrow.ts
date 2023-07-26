import BasicFleetLocationStrategy from '../../strategies/basic-fleet-location-strategy/basic-fleet-location-strategy';
import ShootingOnClearCellsStrategy from '../../strategies/shooting-on-clear-cells-strategy/shooting-on-clear-cells-strategy';
import { calcArea, createBattlefield, isValidCoords } from '../../../services/utils';
import { BattleFieldCell, Coords, Field, Record, Robot, ShipsList, ShootingStrategy } from '../../../types';
import { CellType, GameErrorMessage, PlayerType, ShipShape, ShootResult } from '../../../const';

export default class JackSparrow implements Robot {
  id;
  name;
  type: PlayerType.Robot;
  enemyShipsList: ShipsList;
  enemyField: BattleFieldCell[][];
  shipShape: ShipShape;
  woundedEnemyShip: Coords[];

  constructor() {
    this.id = 'jack';
    this.name = 'Jack Sparrow';
    this.type = PlayerType.Robot;
    this.enemyShipsList = {};
    this.enemyField = [];
    this.shipShape = ShipShape.Line;
    this.woundedEnemyShip = [];
  }

  processHit(coords: Coords) {
    const { x, y } = coords;
    this.enemyField[y][x].type = CellType.Killed;
    this.woundedEnemyShip.push(coords);
  }

  makrCellAsShooted(coords: Coords) {
    const { x, y } = coords;
    this.enemyField[y][x].type = CellType.Shooted;
  }

  handleShoot(record: Record) {
    const [, coords, message] = record;
    if (!coords) return;
    if (message === ShootResult.OffTarget) {
      this.makrCellAsShooted(coords);
    }
    if (message === ShootResult.Wounded) {
      this.processHit(coords);
    }
    if (message === ShootResult.Killed) {
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

  getStrategy() : ShootingStrategy {
    const currentStrategy = new ShootingOnClearCellsStrategy(this.enemyField, this.woundedEnemyShip, this.shipShape);
    return currentStrategy;
  }

  shoot() : Coords {
    const strategy = this.getStrategy();
    const shoot = strategy.getShoot();
    if (!shoot) {
      throw new Error(GameErrorMessage.WrongShoot);
    }
    return shoot;
  }
};
