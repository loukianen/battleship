import cloneDeep from 'lodash-ts/cloneDeep';
import SinglePlayer from '../players/single-player/single-player';
import JackSparrow from '../players/jack-sparrow/jack-sparrow';
import { initialAvailablePlayersState } from '../../store/available-players-process/available-players-process';
import { initialGameOptionsState } from '../../store/game-options-process/game-options-process';
import { generateField, generateShipsList, getRandomElFromColl, getEnemy } from '../../services/utils';
import checkField from '../../services/check-field';
import { Coords, Field, FieldType, Human, PlayerIndex, Record, Robot, ShipsList } from '../../types';
import { GameErrorMessage, PlayerType, ShipShape, ShootResult } from '../../const';

const getHittingResult = (field: Field, target: number) : ShootResult => {
  let isResultWin = true;
  let isResultWounded = false;
  field.forEach((row) => {
    row.forEach((item) => {
      if (item > 0) {
        isResultWin = false;
      }
      if (item === target) {
        isResultWounded = true;
      }
    });
  });
  if (isResultWin) {
    return ShootResult.Won;
  }
  return isResultWounded ? ShootResult.Wounded : ShootResult.Killed;
};

const players : { [index: string]: () => Human | Robot } = {
  user: () => new SinglePlayer(),
  jack: () => new JackSparrow(),
  hector: () => {
    const player = new JackSparrow();
    player.id = 'hector';
    player.name = 'Hector Barbossa';
    return player;
  },
};

const createPlayer = (id: string) => {
  if (!players[id]) {
    throw new Error(GameErrorMessage.WrongPlayer);
  }
  return players[id]();
};

const getPlayersData = () => {
  const allPlayers : Array<Human | Robot> = Object.keys(players).map((nickname) => players[nickname]());
  const playersData = allPlayers.reduce((acc, player) => {
    const { id, name, type } = player;
    if (id === 'user') {
      acc.user = { id, name, type };
    }
    if (type === PlayerType.Robot) {
      acc.robots = [...acc.robots, { id, name, type }];
    }
    return acc;
  }, cloneDeep(initialAvailablePlayersState));
  return playersData;
};

class Game {
  activePlayer: PlayerIndex;
  fields: Field[];
  fieldType: FieldType;
  isGameFinished: boolean;
  players: Array<Human | Robot>; // first player can be Human or Robot, second only Robot
  shipShape: ShipShape;
  shipList: ShipsList;

  constructor() {
    this.activePlayer = 0;
    this.fields = [];
    this.fieldType = initialGameOptionsState.fieldType;
    this.isGameFinished = false;
    this.players = [];
    this.shipShape = ShipShape.Line;
    this.shipList = {};
  }

  getActivePlayer() {
    return this.activePlayer;
  }

  getAvailablePlayers() {
    return getPlayersData();
  }

  getFields() {
    return this.isGameFinished ? this.fields : [];
  }

  handleRecord(record : Record) {
    const currentPlayer = this.players[record[0]];
    if (record[2] === ShootResult.Won) {
      this.isGameFinished = true;
    }
    if (currentPlayer.type === PlayerType.Robot) {
      currentPlayer.handleShoot(record);
    }
    if (record[2] === ShootResult.OffTarget) {
      this.activePlayer = getEnemy(this.getActivePlayer());
    }
  }

  nextHumanTurn(coords: Coords) {
    try {
      const activePlayer = this.players[this.getActivePlayer()];
      if (activePlayer.type === PlayerType.Human) {
        const shootResult : ShootResult = this.processShoot(coords);
        const record : Record = [this.getActivePlayer(), coords, shootResult];
        this.handleRecord(record);
        return record;
      } else {
        throw new Error(`Wrong action ${this.nextHumanTurn.name} for this ${activePlayer.type} type of player`);
      }
    } catch (e: any) {
      const message = e.message ?? 'Unknown error had after checking field';
      return [-1, null, message];
    }
  }
  
  nextRobotTurn() {
    try {
      const activePlayer = this.players[this.getActivePlayer()];
      if (activePlayer.type === PlayerType.Robot) {
        const shoot : Coords = activePlayer.shoot();
        const shootResult : ShootResult = this.processShoot(shoot);
        const record : Record = [this.getActivePlayer(), shoot, shootResult];
        this.handleRecord(record);
        return record;
      } else {
        throw new Error(`Wrong action ${this.nextRobotTurn.name} for this ${activePlayer.type} type of player`);
      }
    } catch (e: any) {
      const message = e.message ?? 'Unknown error had after checking field';
      return [-1, null, message];
    }
  }

  checkFields(cb?: () => void) {
    const checkingFunction = cb ?? checkField;
    this.fields.forEach((field, i) =>{
      checkingFunction(field);
    });
  }

  processShoot(coords: Coords) : ShootResult {
    const { x, y } = coords;
    const enemy = getEnemy(this.getActivePlayer());

    if (!this.fields[enemy][y] || typeof this.fields[enemy][y][x] !== 'number') {
      throw new Error(GameErrorMessage.WrongCoords);
    }

    const target = this.fields[enemy][y][x];

    if (target === 0) {
      return ShootResult.OffTarget;
    }

    this.fields[enemy][y][x] = 0;
    const hittingResult: ShootResult = getHittingResult(this.fields[enemy], target);

    return hittingResult;
  }

  setDefaultOptions() {
    this.players = [];
    this.fields = [];
    this.activePlayer = 0;
    this.fieldType = initialGameOptionsState.fieldType;
    this.shipShape = ShipShape.Line;
    this.isGameFinished = false;
  }

  startBattle(field?: Field) {
    try {
      if (this.players[1].type === PlayerType.Human) {
        throw new Error(GameErrorMessage.WrongSecondPlayer);
      }
      if (this.players[0].type === PlayerType.Human && !field) {
        throw new Error(GameErrorMessage.ShouldGiveField);
      }

      if (field) {
        this.fields[0] = field;
      }
      this.players.forEach((player, index) => {
        if (player.type === PlayerType.Robot) {
          this.fields[index] = player.generateBattlefield(generateField(this.fieldType), cloneDeep(this.shipList), this.shipShape);
        }
      });
      this.checkFields();
      this.activePlayer = getRandomElFromColl([0, 1]);
      const record: Record = [this.getActivePlayer(), null , ShootResult.Started];
      return record;
    } catch (e: any) {
      const message = e.message ?? 'Unknown error recieved after checking field';
      return [-1, null, message];
    }
  }

  startNewGame(options: {
    players: string[],
    fieldType: FieldType,
    shipShapeType?: ShipShape,
    mockCreatePlayer?: (id: string) => Human | Robot,
    mockStartBattle?: () => void,
  }) {
    const { players, fieldType, shipShapeType, mockCreatePlayer, mockStartBattle } = options;
    this.isGameFinished = false;
    this.players = players.map((playerId) => {
      const makePlayer = mockCreatePlayer ?? createPlayer;
      return makePlayer(playerId);
    });
    this.fieldType = fieldType;

    if (shipShapeType) {
      this.shipShape = shipShapeType;
    }

    this.shipList = generateShipsList(this.fieldType);

    return this.players[0].type === PlayerType.Human
      ? { field: generateField(this.fieldType), fleet: cloneDeep(this.shipList) }
      : mockStartBattle ? mockStartBattle() : this.startBattle();
  }
};

const game = new Game();

export default game;
