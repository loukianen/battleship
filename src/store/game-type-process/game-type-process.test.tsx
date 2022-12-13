import gameTypeProcess, { setGameType} from './game-type-process';
import { setAvailablePlayers } from '../available-players-process/available-players-process';
import { setGameOptions } from '../game-options-process/game-options-process';
import { fieldTypes, GameType, PlayerType } from '../../const';

const initialState = GameType.WithAI;

describe('Reducer: gameTypeProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(gameTypeProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toBe(initialState);
  });

  it('should update game type by set data', () => {
    expect(gameTypeProcess.reducer(initialState, setGameType(GameType.Auto))).toBe(GameType.Auto);
  });

  it('should set game type by setAvailablePlayers action', () => {
    const availablePlayers = {
      user: { id: 'firstId', name: 'userName', type: PlayerType.Human },
      robots: [{ id: 'secondId', name: 'robotName', type: PlayerType.Robot }],
    };

    expect(gameTypeProcess.reducer(GameType.Auto, setAvailablePlayers(availablePlayers))).toEqual(GameType.WithAI);
  });

  it('should set game type by setGameOptions action with right data', () => {
    const gameOptions = {
      players: [{id: 'newId', name: 'playerName', type: PlayerType.Robot},
      {id: 'unknown', name: 'unknown', type: PlayerType.Robot}],
    };

    expect(gameTypeProcess.reducer(GameType.WithAI, setGameOptions(gameOptions))).toEqual(GameType.Auto);
  });

  it('should not set game type by setGameOptions action without right data', () => {
    const gameOptions = { fieldType: fieldTypes[0] };

    expect(gameTypeProcess.reducer(GameType.WithAI, setGameOptions(gameOptions))).toEqual(GameType.WithAI);
  });
});
