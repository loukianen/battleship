import SinglePlayer from '../players/single-player/single-player';
import JackSparrow from '../players/jack-sparrow/jack-sparrow';
import { Field, FieldType, Player } from '../types';

export const availablePlayers = [SinglePlayer, JackSparrow];

class Game {
  player1: Player;
  player2: Player;
  field1: Field;
  field2: Field;
  activePlayer: string | undefined;
  fieldType: FieldType;

  constructor() {
    this.player1 = new SinglePlayer();
    this.player2 = new JackSparrow();
    this.field1 = null;
    this.field2 = null;
    this.activePlayer = undefined;
    this.fieldType = '10';
  }

  setDefaultOptions() {
    this.player1 = new SinglePlayer();
    this.player2 = new JackSparrow();
    this.field1 = null;
    this.field2 = null;
    this.activePlayer = undefined;
    this.fieldType = '10';
  }

  // startNewGame(player1Id, player2Id, field1, field2, fieldType, shipsShapeType) {
  //   // this.player1 = player1;
  // }
};

const game = new Game();

export default game;
