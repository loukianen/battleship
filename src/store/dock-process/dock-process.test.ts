import dockProcess, { initialDockState, fillDock } from './dock-process';
import cloneDeep from 'lodash-ts/cloneDeep';
import { UserFleet } from '../../types';

describe('Reducer: gameOptionsProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(dockProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialDockState);
  });

  it('should set new state', () => {
    const newState: UserFleet = cloneDeep(initialDockState);
    newState.fourDeck = [];
    expect(dockProcess.reducer(initialDockState, fillDock(newState))).toEqual(newState);
  });
});
