import { calcArea, createBattlefield, generateField } from "../../../services/utils";
import { BattleFieldCell } from "../../../types";
import { CellType, ShipShape } from "../../../const";
import FinishOffShipStrategy from "./finish-off-ship-strategy";

describe('FinishOffShipStrategy', () => {

  let battlefield: BattleFieldCell[][];

  beforeEach(() => {
    const field = generateField('5');
    battlefield = createBattlefield(field);
  });

  it('should give shoot from full correct area if ship length = 1 and type = line', () => {
    const ship = [{ x: 1, y: 1}];
    const correctArea = calcArea(ship, 'without');
    const strategy = new FinishOffShipStrategy(battlefield, ship, ShipShape.Line);

    expect(correctArea).toContainEqual(strategy.getShoot());
  });

  it('should give shoot from only one coord if area stricted', () => {
    const ship = [{ x: 0, y: 0}];
    battlefield[0][1].type = CellType.Shooted;
    const strategy = new FinishOffShipStrategy(battlefield, ship, ShipShape.Line);

    expect(strategy.getShoot()).toEqual({ x: 0, y: 1});
  });

  it('should give right shoot if ship length = 2 and type = line and area stricted', () => {
    const ship = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
    battlefield[0][1].type = CellType.Shooted;
    const strategy = new FinishOffShipStrategy(battlefield, ship, ShipShape.Line);

    expect(strategy.getShoot()).toEqual({ x: 1, y: 3 });
    
    const horizontalShip = [{ x: 0, y: 4 }, { x: 1, y: 4 }];
    const strategy1 = new FinishOffShipStrategy(battlefield, horizontalShip, ShipShape.Line);
    expect(strategy1.getShoot()).toEqual({ x: 2, y: 4 });
  });

  it('should give right shoot if ship length = 2 and type = any and area stricted', () => {
    const ship = [{ x: 1, y: 1 }, { x: 2, y: 1 }];
    battlefield[1][0].type = CellType.Shooted;
    battlefield[2][1].type = CellType.Shooted;
    battlefield[2][2].type = CellType.Shooted;
    battlefield[1][3].type = CellType.Shooted;
    battlefield[0][2].type = CellType.Shooted;
    const strategy = new FinishOffShipStrategy(battlefield, ship, ShipShape.Any);

    expect(strategy.getShoot()).toEqual({ x: 1, y: 0 });
  });

  it('should return null if are not variants for shooting', () => {
    const ship = [{ x: 1, y: 1 }, { x: 2, y: 1 }];
    battlefield[1][0].type = CellType.Shooted;
    battlefield[1][3].type = CellType.Shooted;
    const strategy = new FinishOffShipStrategy(battlefield, ship, ShipShape.Line);

    expect(strategy.getShoot()).toBeNull();
  });
});
