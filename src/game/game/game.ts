import SinglePlayer from '../players/single-player/single-player';
import JackSparrow from '../players/jack-sparrow/jack-sparrow';
import { generateField, generateShipsList, getRandomElFromColl } from '../../services/utils';
import { checkField } from '../../services/check-field';
import { Coords, Field, FieldType, Human, Record, RecordText, Robot, ShipShape } from '../../types';

const getEnemy = (index: number) : number => index === 0 ? 1 : 0;

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
    return 'won';
  }
  return isResultWounded ? 'wounded' : 'killed';
};

const players : { [index: string]: () => Human | Robot } = {
  user: () => new SinglePlayer(),
  jack: () => new JackSparrow(),
};

const createPlayer = (id: string) => {
  if (!players[id]) {
    throw new Error('Unknown player id');
  }
  return players[id]();
};

class Game {
  players: Array<Human | Robot>;
  fields: Field[];
  activePlayer: number;
  fieldType: FieldType;
  shipShape: ShipShape;

  constructor() {
    this.players = [];
    this.fields = [];
    this.activePlayer = 0;
    this.fieldType = '10';
    this.shipShape = 'line';
  }

  handleRecord(record : Record) {
    this.players.forEach((player) => {
      if (player.type === 'robot') {
        player.handleShoot(record);
      }
    })
    if (record[2] === 'offTarget') {
      this.activePlayer = getEnemy(this.activePlayer);
    }
  }

  nextHumanTurn(coords: Coords) {
    const activePlayer = this.players[this.activePlayer];
    if (activePlayer.type === 'human') {
      const shootResult : RecordText = this.checkShoot(coords);
      const record : Record = [this.activePlayer, coords, shootResult];
      this.handleRecord(record);
      return record;
    } else {
      throw new Error(`Wrong action ${this.nextHumanTurn.name} for this ${activePlayer.type} type of player`);
    }
  }

  nextRobotTurn() {
    const activePlayer = this.players[this.activePlayer];
    if (activePlayer.type === 'robot') {
      const shoot : Coords = activePlayer.shoot();
      const shootResult : RecordText = this.checkShoot(shoot);
      const record :Record = [this.activePlayer, shoot, shootResult];
      this.handleRecord(record);
    } else {
      throw new Error(`Wrong action ${this.nextHumanTurn.name} for this ${activePlayer.type} type of player`);
    }
  }

  checkFields(cb?: () => void) {
    const checkingFunction = cb ?? checkField;
    this.fields.forEach((field) => checkingFunction(field));
  }

  checkShoot(coords: Coords) : RecordText {
    const { x, y } = coords;
    const target = this.fields[getEnemy(this.activePlayer)][x][y];
    if (target === 0) {
      return 'offTarget';
    }
    this.fields[getEnemy(this.activePlayer)][x][y] = 0;
    const hittingResult: RecordText = getHittingResult(this.fields[getEnemy(this.activePlayer)], target);
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
    if (field) {
      this.fields[0] = field;
    }
    this.players.forEach((player, index) => {
      if (player.type === 'robot') {
        this.fields[index] = player.makeField(this.fieldType, this.shipShape);
      }
    })
    this.checkFields();
    this.activePlayer = getRandomElFromColl([0, 1]);
    return [this.activePlayer, null , 'started'];
  }

  startNewGame(players: string[], fieldType: FieldType, shipShapeType: ShipShape, cb?: () => void) {
    this.players = players.map((playerId) => createPlayer(playerId));
    this.fieldType = fieldType;
    this.shipShape = shipShapeType;

    if (this.players[0].type === 'human') {
      return { field: generateField(this.fieldType), fleet: generateShipsList(this.fieldType) };
    }
    cb ? cb() : this.startBattle();
  }
};

const game = new Game();

export default game;
