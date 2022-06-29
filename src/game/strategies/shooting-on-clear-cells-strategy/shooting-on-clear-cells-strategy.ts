import FinishOffShipStrategy from '../finish-off-ship-strategy/finish-off-ship-strategy';
import { BattleFieldCell, Coords, ShipShape } from '../../../types';
import { getClearCells, getRandomElFromColl } from '../../../services/utils';

class ShootingOnClearCellsStrategy {
  battlefield: BattleFieldCell[][];
  woundedShip: Coords[];
  shipShape: ShipShape;

  constructor(battlefield: BattleFieldCell[][], woundedShipCoords: Coords[], shipShape: ShipShape){
    this.battlefield = battlefield;
    this.woundedShip = woundedShipCoords;
    this.shipShape = shipShape;
  }
  
  getShoot() {
    if(this.woundedShip.length > 0) {
      const finishOffShipStrategy = new FinishOffShipStrategy(this.battlefield, this.woundedShip, this.shipShape);
      return finishOffShipStrategy.getShoot();
    }
    return this.shootOnClearCells();
  }
  
  shootOnClearCells() {
    const clearCells = getClearCells(this.battlefield);
    const chosenCellId = getRandomElFromColl(clearCells.ids);
    return clearCells.cells[chosenCellId].coords;
  }
};

export default ShootingOnClearCellsStrategy;
