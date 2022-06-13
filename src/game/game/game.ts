import SinglePlayer from '../players/single-player/single-player';
import JackSparrow from '../players/jack-sparrow/jack-sparrow';
import { generateField, generateShipsList } from '../../services/utils';
import { Field, FieldType, Player, ShipShape } from '../../types';

const createPlayer = (id: string) => {
  const players : { [index: string]: () => Player } = {
    1: () => new SinglePlayer(),
    jack: () => new JackSparrow(),
  };
  if (!players[id]) {
    throw new Error('Unknown player id');
  }
  return players[id]();
};

class Game {
  players: Player[];
  fields: Field[];
  activePlayer: number | undefined;
  fieldType: FieldType;
  shipShape: ShipShape;

  constructor() {
    this.players = [];
    this.fields = [];
    this.fieldType = '10';
    this.shipShape = 'line';
  }

  checkFields() {}

  setDefaultOptions() {
    this.players = [];
    this.fields = [];
    this.activePlayer = undefined;
    this.fieldType = '10';
    this.shipShape = 'line';
  }

  startBattle(field?: Field) {
    if (field) {
      this.fields[0] = field;
    }
    this.checkFields();
  }

  startNewGame(players: string[], fieldType: FieldType, shipShapeType: ShipShape) {
    this.players = players.map((playerId) => createPlayer(playerId));
    this.fieldType = fieldType;
    this.shipShape = shipShapeType;

    if (this.players[0].type === 'human') {
      return { field: generateField(this.fieldType), fleet: generateShipsList(this.fieldType) };
    }

    this.startBattle();
  }
};

const game = new Game();

export default game;
