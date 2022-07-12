import gameStateProcess, { setGameState} from './game-state-process';
import { GameStates } from '../../const';

const initialState = GameStates.NotStarted;

describe('Reducer: gameStateProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(gameStateProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toBe(initialState);
  });

  it('should update gameState by set data', () => {
    expect(gameStateProcess.reducer(initialState, setGameState(GameStates.SettingFleet)))
      .toBe(GameStates.SettingFleet);
  });
});
