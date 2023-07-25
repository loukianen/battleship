import flatten from 'lodash-ts/flatten';
import Ushakov from './ushakov';
import checkField from '../../../services/check-field';
import { calcArea, generateField, generateShipsList } from '../../../services/utils';
import { CellType, fieldTypes, GameErrorMessage, PlayerType, ShootResult } from '../../../const';
import { Record, ShipsList } from '../../../types';
import ShootingOnClearCellsStrategy from '../../strategies/shooting-on-clear-cells-strategy/shooting-on-clear-cells-strategy';

describe('Ushakov', () => {
  it('sould have right default properties', () => {
    const player = new Ushakov();
    expect(player.id).toBe('ushakov');
    expect(player.name).toBe('Ushakov');
    expect(player.type).toBe(PlayerType.Robot);
    expect(player.enemyShipsList).toEqual({});
    expect(player.enemyField).toEqual([]);
    expect(player.shipShape).toBe('line');
    expect(player.woundedEnemyShip).toEqual([]);
  });

  it.each(fieldTypes)('should generate correct battlefield (size %s) and enemy shiplist', (fieldType) => {
    const ushakov = new Ushakov();
    const field = generateField(fieldType);
    const shipsList = generateShipsList(fieldType);
    const battlefield = ushakov.generateBattlefield(field, shipsList);

    expect(() => checkField(battlefield)).not.toThrow();
    expect(ushakov.enemyShipsList).toEqual(shipsList);
  });

  describe('method handleShoot()', () => {
    let ushakov:Ushakov

    beforeEach(() => {
      const field = generateField('5');
      const shipsList = generateShipsList('5');
      ushakov = new Ushakov();
      ushakov.generateBattlefield(field, shipsList);
    });

    it('should mark cell as "shooted" if recieved message "offTarget"', () => {
      const coords1 = { x: 0, y: 2 };
      const reportOffTarget: Record = [0, coords1 , ShootResult.OffTarget];
      ushakov.handleShoot(reportOffTarget);

      expect(ushakov.enemyField[coords1.y][coords1.x].type).toBe(CellType.Shooted);
    });

    it('should mark cell as "killed ship" if recieved message "wounded" and add coords to wounded ship', () => {
      const coords2 = { x: 1, y: 0 };
      const reportWounded: Record = [0, coords2 , ShootResult.Wounded];
      ushakov.handleShoot(reportWounded);

      expect(ushakov.enemyField[coords2.y][coords2.x].type).toBe(CellType.Killed);
      expect(ushakov.woundedEnemyShip).toContainEqual(coords2);
    });

    it('should mark cell as "killed ship" if recieved message "killed" and mark ship area as "shooted"', () => {
      const ship = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
      const shipArea = calcArea(ship);
      const reportWounded: Record = [0, ship[0] , ShootResult.Wounded];
      ushakov.handleShoot(reportWounded);
      const reportKilled: Record = [0, ship[1] , ShootResult.Killed];
      ushakov.handleShoot(reportKilled);

      expect(ushakov.enemyField[ship[0].y][ship[0].x].type).toBe(CellType.Killed);
      expect(ushakov.enemyField[ship[1].y][ship[1].x].type).toBe(CellType.Killed);
      expect(ushakov.woundedEnemyShip).toEqual([]);
      shipArea.forEach(({ x, y }) => {
        expect(ushakov.enemyField[y][x].type).toBe(CellType.Shooted);
      });
    });

    it('should not fix enemy shiplist if recieved message "offTarget"', () => {
      const controlShiplist = { ...ushakov.enemyShipsList };
      const coords1 = { x: 0, y: 2 };
      const reportOffTarget: Record = [0, coords1 , ShootResult.OffTarget];

      ushakov.handleShoot(reportOffTarget);

      expect(ushakov.enemyShipsList).toEqual(controlShiplist);
    });

    it('should not fix enemy shiplist if recieved message "wounded"', () => {
      const controlShiplist = { ...ushakov.enemyShipsList };
      const coords2 = { x: 1, y: 0 };
      const reportWounded: Record = [0, coords2 , ShootResult.Wounded];
      ushakov.handleShoot(reportWounded);

      expect(ushakov.enemyShipsList).toEqual(controlShiplist);
    });

    it('should fix enemy shiplist if recieved message "killed"', () => {
      const controlShiplist: ShipsList = { ...ushakov.enemyShipsList };
      controlShiplist.doubleDeck -= 1;
      const ship = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
      const reportWounded: Record = [0, ship[0] , ShootResult.Wounded];
      ushakov.handleShoot(reportWounded);
      const reportKilled: Record = [0, ship[1] , ShootResult.Killed];
      ushakov.handleShoot(reportKilled);

      expect(ushakov.enemyShipsList).toEqual(controlShiplist);
    });
  });

  describe('method "shoot()"', () => {
    let ushakov: Ushakov;

    beforeEach(() => {
      const field = generateField('5');
      const shipsList = generateShipsList('5');
      ushakov = new Ushakov();
      ushakov.generateBattlefield(field, shipsList);
    });

    it('should return correct data', () => {
      const freeCells = flatten(ushakov.enemyField.map((row) => row.map((cell) => cell.coords)));

      expect(freeCells).toContainEqual(ushakov.shoot());
    });

    it('should throw error if can not give a shoot', () => {
      const fakeStrategy = new ShootingOnClearCellsStrategy(ushakov.enemyField, ushakov.woundedEnemyShip, ushakov.shipShape);
      fakeStrategy.getShoot = () => null;
      ushakov.getStrategy = () => fakeStrategy;

      expect(() => ushakov.shoot()).toThrowError(GameErrorMessage.WrongShoot);
    });
  });

  describe('method "fixListOfEnemyShips()"', () => {
    let ushakov: Ushakov;

    beforeEach(() => {
      const field = generateField('10');
      const shipsList = generateShipsList('10');
      ushakov = new Ushakov();
      ushakov.generateBattlefield(field, shipsList);
    });

    it('should reduced "fourDesk" property at enemy ships list', () => {
      ushakov.fixListOfEnemyShips(4);
      expect(ushakov.enemyShipsList.fourDeck).toBe(0);
    });

    it('should reduced "threeDesk" property at enemy ships list', () => {
      ushakov.fixListOfEnemyShips(3);
      expect(ushakov.enemyShipsList.threeDeck).toBe(1);
    });

    it('should reduced "doubleDesk" property at enemy ships list', () => {
      ushakov.fixListOfEnemyShips(2);
      expect(ushakov.enemyShipsList.doubleDeck).toBe(2);
    });

    it('should reduced "oneDesk" property at enemy ships list', () => {
      ushakov.fixListOfEnemyShips(1);
      expect(ushakov.enemyShipsList.oneDeck).toBe(3);
    });

    it('should not change enemy ships list if argument is not correct', () => {
      const controlShiplist = { ...ushakov.enemyShipsList };
      ushakov.fixListOfEnemyShips(0);
      ushakov.fixListOfEnemyShips(5);
      ushakov.fixListOfEnemyShips(-1);
      expect(ushakov.enemyShipsList).toEqual(controlShiplist);
    });
  });
});
