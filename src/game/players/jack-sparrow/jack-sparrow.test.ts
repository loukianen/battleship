import flatten from 'lodash-ts/flatten';
import JackSparrow from './jack-sparrow';
import checkField from '../../../services/check-field';
import { calcArea, generateField, generateShipsList } from '../../../services/utils';
import { CellType, fieldTypes, GameErrorMessage, PlayerType, ShootResult } from '../../../const';
import { Record } from '../../../types';
import ShootingOnClearCellsStrategy from '../../strategies/shooting-on-clear-cells-strategy/shooting-on-clear-cells-strategy';

describe('JackSparrow', () => {
  it('sould have right default properties', () => {
    const player = new JackSparrow();
    expect(player.id).toBe('jack');
    expect(player.name).toBe('Jack Sparrow');
    expect(player.type).toBe(PlayerType.Robot);
    expect(player.enemyShipsList).toEqual({});
    expect(player.enemyField).toEqual([]);
    expect(player.shipShape).toBe('line');
    expect(player.woundedEnemyShip).toEqual([]);
  });

  it.each(fieldTypes)('should generate correct battlefield (size %s)', (fieldType) => {
    const jack = new JackSparrow();
    const field = generateField(fieldType);
    const shipsList = generateShipsList(fieldType);
    const battlefield = jack.generateBattlefield(field, shipsList);

    expect(() => checkField(battlefield)).not.toThrow();
  });

  describe('method handleShoot()', () => {
    let jack: JackSparrow;

    beforeEach(() => {
      const field = generateField('5');
      const shipsList = generateShipsList('5');
      jack = new JackSparrow();
      jack.generateBattlefield(field, shipsList);
    });

    it('should mark cell as "shooted" if recieved message "offTarget"', () => {
      const coords1 = { x: 0, y: 2 };
      const reportOffTarget: Record = [0, coords1 , ShootResult.OffTarget];
      jack.handleShoot(reportOffTarget);

      expect(jack.enemyField[coords1.y][coords1.x].type).toBe(CellType.Shooted);
    });

    it('should mark cell as "killed ship" if recieved message "wounded" and add coords to wounded ship', () => {
      const coords2 = { x: 1, y: 0 };
      const reportWounded: Record = [0, coords2 , ShootResult.Wounded];
      jack.handleShoot(reportWounded);

      expect(jack.enemyField[coords2.y][coords2.x].type).toBe(CellType.Killed);
      expect(jack.woundedEnemyShip).toContainEqual(coords2);
    });

    it('should mark cell as "killed ship" if recieved message "killed" and mark ship area as "shooted"', () => {
      const ship = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
      const shipArea = calcArea(ship);
      const reportWounded: Record = [0, ship[0] , ShootResult.Wounded];
      jack.handleShoot(reportWounded);
      const reportKilled: Record = [0, ship[1] , ShootResult.Killed];
      jack.handleShoot(reportKilled);

      expect(jack.enemyField[ship[0].y][ship[0].x].type).toBe(CellType.Killed);
      expect(jack.enemyField[ship[1].y][ship[1].x].type).toBe(CellType.Killed);
      expect(jack.woundedEnemyShip).toEqual([]);
      shipArea.forEach(({ x, y }) => {
        expect(jack.enemyField[y][x].type).toBe(CellType.Shooted);
      });
    });
  });

  describe('method "shoot()"', () => {
    let jack: JackSparrow;

    beforeEach(() => {
      const field = generateField('5');
      const shipsList = generateShipsList('5');
      jack = new JackSparrow();
      jack.generateBattlefield(field, shipsList);
    });

    it('should return correct data', () => {
      const freeCells = flatten(jack.enemyField.map((row) => row.map((cell) => cell.coords)));

      expect(freeCells).toContainEqual(jack.shoot());
    });

    it('should throw error if can not give a shoot', () => {
      const fakeStrategy = new ShootingOnClearCellsStrategy(jack.enemyField, jack.woundedEnemyShip, jack.shipShape);
      fakeStrategy.getShoot = () => null;
      jack.getStrategy = () => fakeStrategy;

      expect(() => jack.shoot()).toThrowError(GameErrorMessage.WrongShoot);
    });
  });
});
