import cloneDeep from 'lodash-ts/cloneDeep';
import game from './game';
import SinglePlayer from '../players/single-player/single-player';
import JackSparrow from '../players/jack-sparrow/jack-sparrow';
import { generateField, generateShipsList, getEnemy } from '../../services/utils';
import { Coords, Human, Field, FieldType, Robot, ShipsList } from '../../types';
import { fieldTypes, GameErrorMessage, ShipShape, ShootResult } from '../../const';
import FakeRobot from './fake-robot';

describe('Game', () => {
  it('should has right default setting', () => {
   expect(game.players).toEqual([]);
   expect(game.fields).toEqual([]);
   expect(game.fieldType).toBe(fieldTypes[3]);
   expect(game.shipShape).toBe(ShipShape.Line);
   expect(game.shipList).toEqual({});
   expect(game.activePlayer).toBe(0);
  });

  it('setDefaultOptions() should reset to default cettings', () => {
    game.players = [new JackSparrow(), new JackSparrow()];
    game.fields = [[[1]], [[1]]];
    game.fieldType = fieldTypes[0];
    game.shipShape = ShipShape.Any;
    game.activePlayer = 1;

    expect(game.players.length).toBe(2);
    expect(game.fields.length).toBe(2);
    expect(game.fieldType).toBe(fieldTypes[0]);
    expect(game.shipShape).toBe(ShipShape.Any);
    expect(game.activePlayer).toBe(1);

    game.setDefaultOptions();

    expect(game.players).toEqual([]);
    expect(game.fields).toEqual([]);
    expect(game.fieldType).toBe(fieldTypes[3]);
    expect(game.shipShape).toBe(ShipShape.Line);
    expect(game.activePlayer).toBe(0);
  });

  it('checkFields() should call checking function 2 times', () => {
    const field = [[1, 0, 0], [0, 0, 0], [0, 0, 0]];
    const checkingFunc = jest.fn();
    game.setDefaultOptions();
    game.fields[0] = field;
    game.fields[1] = field;
    game.fieldType = '3';

    game.checkFields(checkingFunc);
    expect(checkingFunc).toBeCalledTimes(2);
  });

  describe('startNewGame()', () => {
    beforeEach(() => {
      game.setDefaultOptions();
    });

    afterAll(() => {
      game.setDefaultOptions();
    });

    it('set right options', () => {
      const gameOptions = { players: ['user', 'jack'], fieldType: fieldTypes[0], shipShapeType: ShipShape.Any };
      game.startNewGame(gameOptions);

      expect(game.players[0]).toBeInstanceOf(SinglePlayer);
      expect(game.players[1]).toBeInstanceOf(JackSparrow);
      expect(game.fieldType).toBe('3');
      expect(game.shipShape).toBe(ShipShape.Any);
    });

    it('if "shipShapeType" not defined in options it should be "line" after run function', () => {
      const gameOptions = { players: ['user', 'jack'], fieldType: fieldTypes[0] };
      game.startNewGame(gameOptions);

      expect(game.shipShape).toBe('line');
    });

    it('if first player has type "human" should return field and fleet', () => {
      const fieldType : FieldType = '3';
      const  mockStartBattle = jest.fn();
      const gameOptions = { players: ['user', 'jack'], fieldType,  mockStartBattle };
      const { field, fleet } = game.startNewGame(gameOptions) as { field: Field, fleet: ShipsList,  mockStartBattle: () => void };

      expect(generateField(fieldType)).toEqual(field);
      expect(generateShipsList(fieldType)).toEqual(fleet);
      expect( mockStartBattle).not.toBeCalled();
    });

    it('if first player has not type "human" should be called callback', () => {
      const fieldType = fieldTypes[0];
      const  mockStartBattle = jest.fn();
      const gameOptions = { players: ['jack', 'jack'], fieldType,  mockStartBattle };
      const result = game.startNewGame(gameOptions) as { field: Field, fleet: ShipsList, mockStartBattle: () => void };

      expect(result).toBeUndefined();
      expect( mockStartBattle).toBeCalledTimes(1);
    });
  });

  describe('startBattle()', () => {
    beforeEach(() => {
      game.setDefaultOptions();
    });

    afterAll(() => {
      game.setDefaultOptions();
    });

    const fakeRobot = new FakeRobot();
    const createFakePlayer = (id: string) : Human | Robot => (
      id === 'user' ? new SinglePlayer() : fakeRobot
    );
    const robotField = [[0, 0, 1], [0, 0, 0], [0, 0, 0]];
    const userField = [[1, 0, 0], [0, 0, 0], [0, 0, 0]];
    const wrongField = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    fakeRobot.generateBattlefield = () => robotField;
    const fieldType : FieldType = '3';
    const  mockCreatePlayer = createFakePlayer;

    it('should set recieved field into first slot and make field for enother', () => {
      const gameOptions = { players: ['user', 'fakeRobot'], fieldType, mockCreatePlayer };
      game.startNewGame(gameOptions);
      game.startBattle(userField);

      expect(game.fields[0]).toEqual(userField);
      expect(game.fields[1]).toEqual(robotField);
    });

    it('should make both field if did not recieved any field and both players are robot', () => {
      const gameOptions = { players: ['fakeRobot', 'fakeRobot'], fieldType, mockCreatePlayer };
      game.startNewGame(gameOptions);
      game.startBattle();

      expect(game.fields[0]).toEqual(robotField);
      expect(game.fields[1]).toEqual(robotField);
    });

    it('should return report about start', () => {
      const gameOptions = { players: ['user', 'fakeRobot'], fieldType, mockCreatePlayer };
      game.startNewGame(gameOptions);
      const report = game.startBattle(userField);

      expect(report[0]).toBe(game.activePlayer);
      expect(report[1]).toBeNull();
      expect(report[2]).toBe('started');
    });

    it('should return report with an error if field incorrect', () => {
      const gameOptions = { players: ['user', 'fakeRobot'], fieldType, mockCreatePlayer };
      game.startNewGame(gameOptions);
      const report = game.startBattle(wrongField);

      expect(report).toEqual([-1, null, GameErrorMessage.ShipsCollection]);
    });

    it('should return report with an error if second player is human', () => {
      const gameOptions = { players: ['user', 'user'], fieldType, mockCreatePlayer };
      game.startNewGame(gameOptions);
      const report = game.startBattle(userField);

      expect(report).toEqual([-1, null, GameErrorMessage.WrongSecondPlayer]);
    });

    it('should return report with an error if human did not give his field', () => {
      const gameOptions = { players: ['user', 'fakeRobot'], fieldType, mockCreatePlayer };
      game.startNewGame(gameOptions);
      const report = game.startBattle();

      expect(report).toEqual([-1, null, GameErrorMessage.ShouldGiveField]);
    });
  });

  describe('nextHumanTurn()', () => {
    beforeEach(() => {
      game.setDefaultOptions();
    });

    afterAll(() => {
      game.setDefaultOptions();
    });

    const field = [
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 2, 2],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    const fieldType = fieldTypes[1];

    const fakeRobot = new FakeRobot();
    fakeRobot.handleShoot = jest.fn();
    fakeRobot.generateBattlefield = () => cloneDeep(field);

    const createFakePlayer = (id: string) : Human | Robot => (
      id === 'user' ? new SinglePlayer() : fakeRobot
    );
    const  mockCreatePlayer = createFakePlayer;

    it('should return report with error if coords incorrect', () => {
      const gameOptions = { players: ['user', 'fakeRobot'], fieldType, mockCreatePlayer };
      const incorrectCoords = { x: 5, y: 4};
      game.startNewGame(gameOptions);
      game.startBattle(cloneDeep(field));
      game.activePlayer = 0;

      expect(game.nextHumanTurn(incorrectCoords)).toEqual([-1, null, GameErrorMessage.WrongCoords]);
    });

    it('should return report with error if called wrong function', () => {
      const gameOptions = { players: ['user', 'fakeRobot'], fieldType, mockCreatePlayer };
      const errorMessage = 'Wrong action nextHumanTurn for this robot type of player';
      game.startNewGame(gameOptions);
      game.startBattle(cloneDeep(field));
      game.activePlayer = 1;

      expect(game.nextHumanTurn({ x: 1, y:1 })).toEqual([-1, null, errorMessage]);
    });

    it('should return right reports', () => {
      const gameOptions = { players: ['user', 'fakeRobot'], fieldType, mockCreatePlayer };
      game.startNewGame(gameOptions);
      game.startBattle(cloneDeep(field));
      game.activePlayer = 0;

      const firstShoot = { x: 1, y: 1 };
      expect(game.nextHumanTurn(firstShoot)).toEqual([0, firstShoot, ShootResult.OffTarget]);
      expect(game.activePlayer).toBe(1);

      game.activePlayer = 0;
      const secondShout = { x: 3, y: 2 };
      expect(game.nextHumanTurn(secondShout)).toEqual([0, secondShout, ShootResult.Wounded]);
      expect(game.activePlayer).toBe(0);

      const thirdShout = { x: 4, y: 2 };
      expect(game.nextHumanTurn(thirdShout)).toEqual([0, thirdShout, ShootResult.Killed]);
      expect(game.activePlayer).toBe(0);

      const fourthShout = { x: 2, y: 0 };
      expect(game.nextHumanTurn(fourthShout)).toEqual([0, fourthShout, ShootResult.Won]);
      expect(game.activePlayer).toBe(0);
    });

    it('should change value of cell on enemy field after hitting ship', () => {
      const gameOptions = { players: ['user', 'fakeRobot'], fieldType, mockCreatePlayer };
      game.startNewGame(gameOptions);
      game.startBattle(cloneDeep(field));
      game.activePlayer = 0;
      
      const getTarget = (shoot: Coords, currentPlayer: number) => {
        const { x, y } = shoot;
        return game.fields[currentPlayer][y][x];
      };
      const shoot = { x: 2, y: 0 };
      const enemy = getEnemy(game.activePlayer);

      expect(getTarget(shoot, enemy)).toBe(1);
      game.nextHumanTurn(shoot);
      expect(getTarget(shoot, enemy)).toBe(0);
    });
  });

  describe('nextRobotTurn()', () => {
    beforeEach(() => {
      game.setDefaultOptions();
    });

    afterAll(() => {
      game.setDefaultOptions();
    });

    const fakeRobot = new FakeRobot();
    fakeRobot.handleShoot = jest.fn();
    const createFakePlayer = (id: string) : Human | Robot => (
      id === 'user' ? new SinglePlayer() : fakeRobot
    );
    const field = [
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 2, 2],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    fakeRobot.generateBattlefield = () => field;
    const fieldType = fieldTypes[1];
    const  mockCreatePlayer = createFakePlayer;
    const gameOptions = { players: ['fakeRobot', 'fakeRobot'], fieldType, mockCreatePlayer };

    it('should return report with error if coords incorrect', () => {
      fakeRobot.shoot = () => ({ x: 5, y: 4});
      game.startNewGame(gameOptions);
      game.startBattle(field);
      game.activePlayer = 0;

      expect(game.nextRobotTurn()).toEqual([-1, null, GameErrorMessage.WrongCoords]);
    });

    it('should return report with error if called wrong function', () => {
      const errorMessage = 'Wrong action nextHumanTurn for this robot type of player';
      game.startNewGame(gameOptions);
      game.startBattle(field);

      expect(game.nextHumanTurn({ x: 1, y: 1 })).toEqual([-1, null, errorMessage]);
    });

    it('every shoots should change enemy field and should be porocessed by robots', () => {
      const shoots = [{ x: 1, y: 1 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 2, y: 0 }];
      let shootCounter = 0
      fakeRobot.shoot = () => {
        const curShoot = { ...shoots[shootCounter] };
        shootCounter += 1;
        return curShoot;
      };
      game.startNewGame(gameOptions);
      game.startBattle(field);
      game.activePlayer = 0;

      game.nextRobotTurn();
      expect(game.activePlayer).toBe(1);

      game.activePlayer = 0;
      const enemy = getEnemy(game.activePlayer);
      const getTarget = (shoot: Coords, currentPlayer: number) => {
        const { x, y } = shoot;
        return game.fields[currentPlayer][y][x];
      };

      expect(getTarget(shoots[1], enemy)).toBe(2);
      game.nextRobotTurn();
      expect(getTarget(shoots[1], enemy)).toBe(0);

      expect(getTarget(shoots[2], enemy)).toBe(2);
      game.nextRobotTurn();
      expect(getTarget(shoots[2], enemy)).toBe(0);

      expect(getTarget(shoots[3], enemy)).toBe(1);
      game.nextRobotTurn();
      expect(getTarget(shoots[3], enemy)).toBe(0);

      const robot1 = game.players[0] as Robot;
      expect(robot1.handleShoot).toBeCalledTimes(4);

      const robot2 = game.players[1] as Robot;
      expect(robot2.handleShoot).toBeCalledTimes(4);
    });
  });

  it('getAvailablePlayers() should return correct data', () => {
    game.setDefaultOptions();
    const correctPlayerData = { id: expect.any(String), name: expect.any(String), type: expect.any(String) };
    const players = game.getAvailablePlayers();

    expect(players).toMatchObject({
      user: correctPlayerData,
      robots: expect.any(Array),
    });
    expect(players.robots).toContainEqual(correctPlayerData);

    game.setDefaultOptions();
  });
});
