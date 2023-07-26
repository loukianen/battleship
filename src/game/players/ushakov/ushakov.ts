import JackSparrow from "../jack-sparrow/jack-sparrow";
import { Field, Record, ShipsList, ShootingStrategy } from "../../../types";
import { ShipClass, ShipShape, ShootResult } from "../../../const";
import ShootingOnClearCellsStrategy from "../../strategies/shooting-on-clear-cells-strategy/shooting-on-clear-cells-strategy";

class SearchShipByClassStrategy implements ShootingStrategy {
  getShoot() {
    return { x: 1, y: 1 };
  }
} 

export default class Ushakov extends JackSparrow {
    enemyShipsList: ShipsList;
    handleShootPrototype: typeof JackSparrow.prototype.handleShoot;
    generateBattlefieldPrototype: typeof JackSparrow.prototype.generateBattlefield;
  
    constructor() {
      super();
      this.id = 'ushakov';
      this.name = 'Ushakov';
      this.enemyShipsList = {};
      this.handleShootPrototype = JackSparrow.prototype.handleShoot.bind(this);
      this.generateBattlefieldPrototype = JackSparrow.prototype.generateBattlefield.bind(this);
    }
  
    fixListOfEnemyShips(killedShipLength: number) {
      let killedShipClass;
      if (killedShipLength === 4) {
        killedShipClass = ShipClass.Four;
      } else if (killedShipLength === 3) {
        killedShipClass = ShipClass.Three;
      } else if (killedShipLength === 2) {
        killedShipClass = ShipClass.Double;
      } else if (killedShipLength === 1){
        killedShipClass = ShipClass.One;
      }

      if (killedShipClass) {
        this.enemyShipsList[killedShipClass] -= 1;
      }
    }
  
    handleShoot(record: Record) {
      const [, , message] = record;
      if (message === ShootResult.Killed) {
        const killedShipLength = this.woundedEnemyShip.length + 1;
        this.fixListOfEnemyShips(killedShipLength);
      }
      this.handleShootPrototype(record);
    }

    generateBattlefield(field: Field, shipList: ShipsList, shipsShapeType?: ShipShape) {
      this.enemyShipsList = { ...shipList };
      return this.generateBattlefieldPrototype(field, shipList, shipsShapeType);
    }

    getStrategy() {
      let currentStrategy;
      if (this.enemyShipsList.fourDeck > 0) {
        currentStrategy = new SearchShipByClassStrategy();
      } else if (this.enemyShipsList.threeDeck > 0) {
        currentStrategy = new SearchShipByClassStrategy();
      } else if (this.enemyShipsList.doubleDeck > 0) {
        currentStrategy = new SearchShipByClassStrategy();
      } else {
        currentStrategy = new ShootingOnClearCellsStrategy(this.enemyField, this.woundedEnemyShip, this.shipShape);
      }
      return currentStrategy;
    }
  };