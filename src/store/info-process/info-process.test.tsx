import infoProcess, { setInfo } from './info-process';
import { setGameState } from '../game-state-process/game-state-process';
import { GameState } from '../../const';
import { InfoState, InfoStatePayload } from '../../types';

const initialState: InfoState = { message: 'makeSetting', player: null};

describe('Reducer: InfoProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(infoProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialState);
  });

  it('should correct set new state without player attribute', () => {
    const oldState: InfoState = { ...initialState, player: 0 };
    const newState: InfoStatePayload = { message: 'killEnemy' };

    expect(infoProcess.reducer(oldState, setInfo(newState))).toEqual({ ...newState, player: null });
  });

  it('should set right state if game state had change', () => {
    const setFleetState: InfoState = { message: 'setFleet', player: null };

    expect(infoProcess.reducer(setFleetState, setGameState(GameState.NotStarted))).toEqual(initialState);
    expect(infoProcess.reducer(initialState, setGameState(GameState.Started))).toEqual(setFleetState);
    expect(infoProcess.reducer(initialState, setGameState(GameState.SettingFleet))).toEqual(initialState);
    expect(infoProcess.reducer(setFleetState, setGameState(GameState.Finished))).toEqual(setFleetState);
  });
});
