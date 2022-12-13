import gameTypeProcess, { setGameType} from './game-type-process';
import { setAvailablePlayers } from '../available-players-process/available-players-process';
import { setGameOptions } from '../game-options-process/game-options-process';
import { fieldTypes, GameTypes, PlayerTypes } from '../../const';

const initialState = GameTypes.WithAI;

describe('Reducer: gameTypeProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(gameTypeProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toBe(initialState);
  });

  it('should update game type by set data', () => {
    expect(gameTypeProcess.reducer(initialState, setGameType(GameTypes.Auto))).toBe(GameTypes.Auto);
  });

  it('should set game type by setAvailablePlayers action', () => {
    const availablePlayers = {
      user: { id: 'firstId', name: 'userName', type: PlayerTypes.Human },
      robots: [{ id: 'secondId', name: 'robotName', type: PlayerTypes.Robot }],
    };

    expect(gameTypeProcess.reducer(GameTypes.Auto, setAvailablePlayers(availablePlayers))).toEqual(GameTypes.WithAI);
  });

  it('should set game type by setGameOptions action with right data', () => {
    const gameOptions = {
      players: [{id: 'newId', name: 'playerName', type: PlayerTypes.Robot},
      {id: 'unknown', name: 'unknown', type: PlayerTypes.Robot}],
    };

    expect(gameTypeProcess.reducer(GameTypes.WithAI, setGameOptions(gameOptions))).toEqual(GameTypes.Auto);
  });

  it('should not set game type by setGameOptions action without right data', () => {
    const gameOptions = { fieldType: fieldTypes[0] };

    expect(gameTypeProcess.reducer(GameTypes.WithAI, setGameOptions(gameOptions))).toEqual(GameTypes.WithAI);
  });
});
