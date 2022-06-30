import flatten from 'lodash-ts/flatten';
import JackSparrow from './jack-sparrow';
import checkField from '../../../services/check-field';
import { calcArea, generateField, generateShipsList } from '../../../services/utils';
import { BattlefieldCellTypes, fieldTypes, GameErrorMessages, ShootResults } from '../../../const';
import { Record } from '../../../types';
import ShootingOnClearCellsStrategy from '../../strategies/shooting-on-clear-cells-strategy/shooting-on-clear-cells-strategy';

describe('JackSparrow', () => {
  it('sould have right default properties', () => {
    const player = new JackSparrow();
    expect(player.id).toBe('jack');
    expect(player.name).toBe('Jack Sparrow');
    expect(player.type).toBe('robot');
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
      const coords1 = { x: 0, y: 0 };
      const reportOffTarget: Record = [0, coords1 , ShootResults.OffTarget];
      jack.handleShoot(reportOffTarget);

      expect(jack.enemyField[coords1.x][coords1.y].type).toBe(BattlefieldCellTypes.Shooted);
    });

    it('should mark cell as "killed ship" if recieved message "wounded" and add coords to wounded ship', () => {
      const coords2 = { x: 1, y: 1 };
      const reportWounded: Record = [0, coords2 , ShootResults.Wounded];
      jack.handleShoot(reportWounded);

      expect(jack.enemyField[coords2.x][coords2.y].type).toBe(BattlefieldCellTypes.Killed);
      expect(jack.woundedEnemyShip).toContainEqual(coords2);
    });

    it('should mark cell as "killed ship" if recieved message "killed" and mark ship area as "shooted"', () => {
      const ship = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
      const shipArea = calcArea(ship);
      const reportWounded: Record = [0, ship[0] , ShootResults.Wounded];
      jack.handleShoot(reportWounded);
      const reportKilled: Record = [0, ship[1] , ShootResults.Killed];
      jack.handleShoot(reportKilled);

      expect(jack.enemyField[ship[0].x][ship[0].y].type).toBe(BattlefieldCellTypes.Killed);
      expect(jack.enemyField[ship[1].x][ship[1].y].type).toBe(BattlefieldCellTypes.Killed);
      expect(jack.woundedEnemyShip).toEqual([]);
      shipArea.forEach(({ x, y }) => {
        expect(jack.enemyField[x][y].type).toBe(BattlefieldCellTypes.Shooted);
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

      expect(() => jack.shoot()).toThrowError(GameErrorMessages.WrongShoot);
    });
  });
});
