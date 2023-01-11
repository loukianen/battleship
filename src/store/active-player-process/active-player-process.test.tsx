import activePlayerProcess, { setActivePlayer} from './active-player-process';
import { initialGameOptionsState, setGameOptions } from '../game-options-process/game-options-process';
import { setGameState } from '../game-state-process/game-state-process';
import { GameState } from '../../const';

const initialState = 'undefined';

describe('Reducer: activePlayerProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(activePlayerProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toBe(initialState);
  });

  it('should update activePlayer by set data', () => {
    expect(activePlayerProcess.reducer(initialState, setActivePlayer(1))).toBe(1);
  });

  it('should set "undefined" active player if game options had changed', () => {
    expect(activePlayerProcess.reducer(0, setGameOptions(initialGameOptionsState))).toBe('undefined');
  });

  it('should set "undefined" active player if game state "setting fleet" or "finished"', () => {
    expect(activePlayerProcess.reducer(0, setGameState(GameState.NotStarted))).toBe(0);
    expect(activePlayerProcess.reducer(0, setGameState(GameState.Battle))).toBe(0);
    expect(activePlayerProcess.reducer(0, setGameState(GameState.SettingFleet))).toBe('undefined');
    expect(activePlayerProcess.reducer(0, setGameState(GameState.Finished))).toBe('undefined');
  });
});
