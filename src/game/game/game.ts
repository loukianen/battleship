import cloneDeep from 'lodash-ts/cloneDeep';
import SinglePlayer from '../players/single-player/single-player';
import JackSparrow from '../players/jack-sparrow/jack-sparrow';
import { generateField, generateShipsList, getRandomElFromColl, getEnemy } from '../../services/utils';
import checkField from '../../services/check-field';
import { Coords, Field, FieldType, Human, Record, RecordText, Robot, ShipsList, ShipShape, PlayersDataType } from '../../types';
import { GameErrorMessages, PlayerTypes, ShootResults } from '../../const';

const getHittingResult = (field: Field, target: number) : RecordText => {
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
    return ShootResults.Won;
  }
  return isResultWounded ? ShootResults.Wounded : ShootResults.Killed;
};

const players : { [index: string]: () => Human | Robot } = {
  user: () => new SinglePlayer(),
  jack: () => new JackSparrow(),
};

const createPlayer = (id: string) => {
  if (!players[id]) {
    throw new Error(GameErrorMessages.WrongPlayer);
  }
  return players[id]();
};

const getPlayersData = () => {
  const allPlayers : Array<Human | Robot> = Object.keys(players).map((nickname) => players[nickname]());
  const playersData = allPlayers.reduce((acc, player) => {
    const { id, name, type } = player;
    if (id === 'user') {
      acc.user = { id, name };
    }
    if (type === PlayerTypes.Robot) {
      acc.robots = [...acc.robots, { id, name }];
    }
    return acc;
  }, { user: {}, robots: [] } as PlayersDataType);
  return playersData;
};

class Game {
  players: Array<Human | Robot>; // first player can be Human or Robot, second only Robot
  fields: Field[];
  activePlayer: number;
  fieldType: FieldType;
  shipShape: ShipShape;
  shipList: ShipsList;

  constructor() {
    this.players = [];
    this.fields = [];
    this.activePlayer = 0;
    this.fieldType = '10';
    this.shipShape = 'line';
    this.shipList = {};
  }

  getActivePlayer() {
    return this.activePlayer;
  }

  getAvailablePlayers() {
    return getPlayersData();
  }

  handleRecord(record : Record) {
    this.players.forEach((player) => {
      if (player.type === PlayerTypes.Robot) {
        player.handleShoot(record);
      }
    })
    if (record[2] === ShootResults.OffTarget) {
      this.activePlayer = getEnemy(this.getActivePlayer());
    }
  }

  nextHumanTurn(coords: Coords) {
    try {
      const activePlayer = this.players[this.getActivePlayer()];
      if (activePlayer.type === PlayerTypes.Human) {
        const shootResult : RecordText = this.processShoot(coords);
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
      if (activePlayer.type === PlayerTypes.Robot) {
        const shoot : Coords = activePlayer.shoot();
        const shootResult : RecordText = this.processShoot(shoot);
        const record : Record = [this.getActivePlayer(), shoot, shootResult];
        this.handleRecord(record);
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
    this.fields.forEach((field) => checkingFunction(field));
  }

  processShoot(coords: Coords) : RecordText {
    const { x, y } = coords;
    const enemy = getEnemy(this.getActivePlayer());

    if (!this.fields[enemy][x] || typeof this.fields[enemy][x][y] !== 'number') {
      throw new Error(GameErrorMessages.WrongCoords);
    }

    const target = this.fields[enemy][x][y];

    if (target === 0) {
      return ShootResults.OffTarget;
    }

    this.fields[enemy][x][y] = 0;
    const hittingResult: RecordText = getHittingResult(this.fields[enemy], target);

    return hittingResult;
  }

  setDefaultOptions() {
    this.players = [];
    this.fields = [];
    this.activePlayer = 0;
    this.fieldType = '10';
    this.shipShape = 'line';
  }

  startBattle(field?: Field) {
    try {
      if (this.players[1].type === PlayerTypes.Human) {
        throw new Error(GameErrorMessages.WrongSecondPlayer);
      }
      if (this.players[0].type === PlayerTypes.Human && !field) {
        throw new Error(GameErrorMessages.ShouldGiveField);
      }

      if (field) {
        this.fields[0] = field;
      }
      this.players.forEach((player, index) => {
        if (player.type === PlayerTypes.Robot) {
          this.fields[index] = player.generateBattlefield(generateField(this.fieldType), cloneDeep(this.shipList), this.shipShape);
        }
      });
      this.checkFields();
      this.activePlayer = getRandomElFromColl([0, 1]);
      return [this.getActivePlayer(), null , ShootResults.Started];
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
    this.players = players.map((playerId) => {
      const makePlayer = mockCreatePlayer ?? createPlayer;
      return makePlayer(playerId);
    });
    this.fieldType = fieldType;

    if (shipShapeType) {
      this.shipShape = shipShapeType;
    }

    this.shipList = generateShipsList(this.fieldType);

    return this.players[0].type === PlayerTypes.Human
      ? { field: generateField(this.fieldType), fleet: cloneDeep(this.shipList) }
      : mockStartBattle ? mockStartBattle() : this.startBattle();
  }
};

const game = new Game();

export default game;
