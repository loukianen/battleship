import { createBattlefield, generateField } from "../../../services/utils";
import { BattleFieldCell } from "../../../types";
import { CellType, ShipClass, ShipShape } from "../../../const";
import SearchShipByClassStrategy from "./search-ship-by-class-strategy";

describe('ShootingOnClearCellsStrategy', () => {
  let shootedBattlefield: BattleFieldCell[][];

  const makeClearArea = (clearingIndex: number) => {
    shootedBattlefield.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (y === clearingIndex || x === clearingIndex) {
          cell.type = CellType.Clear;
        }
      });
    });
  };

  it('should give shoot on correct area for foorDesk ship', () => {
    const field = generateField('10');
    const battlefield = createBattlefield(field);
    shootedBattlefield = battlefield.map((row) => row.map((cell) => ({...cell, type: CellType.Shooted})));
    const clearingIndex = 4;
    makeClearArea(clearingIndex);

    const strategy4 = new SearchShipByClassStrategy(shootedBattlefield, [], ShipShape.Any, ShipClass.Four);
    const shoot4 = strategy4.getShoot();
    expect(shoot4).toEqual({ x: clearingIndex, y: clearingIndex });

    const strategy3 = new SearchShipByClassStrategy(shootedBattlefield, [], ShipShape.Any, ShipClass.Three);
    const shoot3 = strategy3.getShoot();
    expect(shoot3).toEqual({ x: clearingIndex, y: clearingIndex });

    const strategy2 = new SearchShipByClassStrategy(shootedBattlefield, [], ShipShape.Any, ShipClass.Double);
    const shoot2 = strategy2.getShoot();
    expect(shoot2).toEqual({ x: clearingIndex, y: clearingIndex });

    const strategy1 = new SearchShipByClassStrategy(shootedBattlefield, [], ShipShape.Any, ShipClass.One);
    const shoot1 = strategy1.getShoot();
    expect(shoot1?.x === clearingIndex || shoot1?.y === clearingIndex).toBeTruthy();
  });
});