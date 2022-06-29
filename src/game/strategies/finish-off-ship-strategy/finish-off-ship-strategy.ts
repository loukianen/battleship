import { calcArea, getRandomElFromColl, isValidCoords } from "../../../services/utils";
import { BattlefieldCellTypes } from "../../../const";
import { BattleFieldCell, Coords, ShipShape } from "../../../types";

const getOverMinEndMax = (arr: number[]) => ([Math.min(...arr) - 1, Math.max(...arr) + 1]);

class FinishOffShipStrategy {
  battlefield: BattleFieldCell[][];
  woundedShip: Coords[];
  isShipShapeLine: boolean;
  shipOrientation: 'east' | 'north' | null;

  constructor(battlefield: BattleFieldCell[][], woundedShipCoords: Coords[], shipShape: ShipShape){
    this.battlefield = battlefield;
    this.woundedShip = woundedShipCoords;
    this.isShipShapeLine = shipShape === 'line';
    this.shipOrientation = this.findOutShipOrientation();
  }

  findOutShipOrientation() {
    if (!this.isShipShapeLine || this.woundedShip.length < 2) {
      return null;
    }
    const xs = new Set();
    const ys = new Set();
    this.woundedShip.forEach(({ x, y }) => {
      xs.add(x);
      ys.add(y);
    });
    if (xs.size === 1) {
      return 'north';
    }
    if (ys.size === 1) {
      return 'east';
    }
    return null;
  }

  getEdgePoints() {
    if (this.shipOrientation === 'north') {
      const x = this.woundedShip[0].x;
      const ys = this.woundedShip.map((item) => item.y);
      return getOverMinEndMax(ys).map((item) => ({ x, y: item }));
    }
    if (this.shipOrientation === 'east') {
      const y = this.woundedShip[0].y;
      const xs = this.woundedShip.map((item) => item.x);
      return getOverMinEndMax(xs).map((item) => ({ x: item, y }));
    }
    return [];
  }

  getShoot() {
    const areaForShooting = this.shipOrientation ? this.getEdgePoints() : calcArea(this.woundedShip, 'without');
    const posibleShoots = areaForShooting
      .filter((coords) => isValidCoords(coords, 0, this.battlefield.length - 1))
      .filter(({x, y}) => this.battlefield[x][y].type === BattlefieldCellTypes.Clear);
    return posibleShoots.length > 0 ? getRandomElFromColl(posibleShoots) : null;
  }

};

export default FinishOffShipStrategy;
