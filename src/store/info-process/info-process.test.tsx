import infoProcess, { setInfo } from './info-process';
import { setGameState } from '../game-state-process/game-state-process';
import { GameState } from '../../const';
import { InfoKey } from '../../locales/types';

const initialState = 'makeSetting' as InfoKey;

describe('Reducer: InfoProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(infoProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialState);
  });

  it('should set new state', () => {
    const newState = 'killEnemy';
    expect(infoProcess.reducer(initialState, setInfo(newState))).toBe(newState);
  });

  it('should set right state if game state had change', () => {
    expect(infoProcess.reducer('setFleet', setGameState(GameState.NotStarted))).toBe(initialState);
    expect(infoProcess.reducer(initialState, setGameState(GameState.Started))).toBe('setFleet');
    expect(infoProcess.reducer(initialState, setGameState(GameState.SettingFleet))).toBe(initialState);
    expect(infoProcess.reducer('setFleet', setGameState(GameState.Finished))).toBe('setFleet');
  });
});
