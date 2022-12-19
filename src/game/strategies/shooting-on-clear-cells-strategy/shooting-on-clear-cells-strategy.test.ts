import { createBattlefield, generateField } from "../../../services/utils";
import { BattleFieldCell, Coords } from "../../../types";
import { CellType, ShipShape } from "../../../const";
import ShootingOnClearCellsStrategy from "./shooting-on-clear-cells-strategy";

describe('ShootingOnClearCellsStrategy', () => {
  let shootedBattlefield: BattleFieldCell[][];

  const makeClearArea = (coords: Coords[]) => {
    coords.forEach(({x, y}) => {
      shootedBattlefield[x][y].type = CellType.Clear;
    });
  };

  beforeEach(() => {
    const field = generateField('5');
    const battlefield = createBattlefield(field);
    shootedBattlefield = battlefield.map((row) => row.map((cell) => ({...cell, type: CellType.Shooted})));
  });

  it('should give shoot from correct area', () => {
    const clearArea = [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 }];
    makeClearArea(clearArea);

    const strategy = new ShootingOnClearCellsStrategy(shootedBattlefield, [], ShipShape.Any);

    expect(clearArea).toContainEqual(strategy.getShoot());
  });

  it('should give shoot if area is stricted', () => {
    const clearArea = [{ x: 1, y: 1 }];
    makeClearArea(clearArea);

    const strategy = new ShootingOnClearCellsStrategy(shootedBattlefield, [], ShipShape.Any);

    expect(strategy.getShoot()).toEqual(clearArea[0]);
  });
});
