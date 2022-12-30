import shipInMoveProcess, { takeShipOutOfDock } from './ship-in-move-process';
import { setGameOptions, initialGameOptionsState } from '../game-options-process/game-options-process';
import { setGameState } from '../game-state-process/game-state-process';
import OneDeckShip from '../../ships/one-deck-ship/one-deck-ship';
import { GameState } from '../../const';

const initialState = null;

describe('Reducer: shipInMoveProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(shipInMoveProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toBe(initialState);
  });

  it('should set new state', () => {
    const ship = new OneDeckShip(1);
    expect(shipInMoveProcess.reducer(initialState, takeShipOutOfDock(ship))).toEqual(ship);
  });

  it('should set initial state if game options shanged', () => {
    const ship = new OneDeckShip(1);
    expect(shipInMoveProcess.reducer(ship, setGameOptions(initialGameOptionsState))).toBe(initialState);
  });

  it('should set initial state if game state "setting fleet"', () => {
    const ship = new OneDeckShip(1);
    expect(shipInMoveProcess.reducer(ship, setGameState(GameState.SettingFleet))).toBe(initialState);
  });

  it('should not change state if game state not "setting fleet"', () => {
    const ship = new OneDeckShip(1);
    expect(shipInMoveProcess.reducer(ship, setGameState(GameState.Finished))).toEqual(ship);
  });
});
