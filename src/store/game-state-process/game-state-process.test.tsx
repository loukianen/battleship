import gameStateProcess, { setGameState} from './game-state-process';
import { initialGameOptionsState, setGameOptions } from '../game-options-process/game-options-process';
import { GameState } from '../../const';

const initialState = GameState.NotStarted;

describe('Reducer: gameStateProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(gameStateProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toBe(initialState);
  });

  it('should update gameState by set data', () => {
    expect(gameStateProcess.reducer(initialState, setGameState(GameState.SettingFleet)))
      .toBe(GameState.SettingFleet);
  });

  it('should set "not started" game state if game options had changed', () => {
    expect(gameStateProcess.reducer(GameState.SettingFleet, setGameOptions(initialGameOptionsState)))
      .toBe(GameState.NotStarted);
  })
});
