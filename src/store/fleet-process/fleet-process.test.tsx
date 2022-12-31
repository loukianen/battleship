import fleetProcess, { placeShipOnBattlefield } from './fleet-process';
import { moveShip } from '../ship-in-move-process/ship-in-move-process';
import { setGameOptions, initialGameOptionsState } from '../game-options-process/game-options-process';
import { setGameState } from '../game-state-process/game-state-process';
import OneDeckShip from '../../ships/one-deck-ship/one-deck-ship';
import { GameState } from '../../const';

const ship1 = new OneDeckShip(1);
const ship2 = new OneDeckShip(2);
const initialState = {};
const stateWithOneShip = {[ship1.id]: ship1};
const stateWithTwoShips = {[ship1.id]: ship1, [ship2.id]: ship2};

describe('Reducer: fleetProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(fleetProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialState);
  });

  it('should set new state', () => {
    expect(fleetProcess.reducer(initialState, placeShipOnBattlefield(ship1))).toEqual(stateWithOneShip);
    expect(fleetProcess.reducer(stateWithOneShip, placeShipOnBattlefield(ship2))).toEqual(stateWithTwoShips);
  });

  it('should delete ship from state', () => {
    expect(fleetProcess.reducer(stateWithTwoShips, moveShip(ship2))).toEqual(stateWithOneShip);
    expect(fleetProcess.reducer(stateWithOneShip, moveShip(ship1))).toEqual(initialState);
  });

  it('should correctly work with unexist ship', () => {
    expect(fleetProcess.reducer(stateWithOneShip, moveShip(ship2))).toEqual(stateWithOneShip);
  })

  it('should set initial state if game options shanged', () => {
    expect(fleetProcess.reducer(stateWithTwoShips, setGameOptions(initialGameOptionsState))).toEqual(initialState);
  });

  it('should set initial state if game state "setting fleet"', () => {
    expect(fleetProcess.reducer(stateWithTwoShips, setGameState(GameState.SettingFleet))).toEqual(initialState);
  });

  it('should not change state if game state not "setting fleet"', () => {
    expect(fleetProcess.reducer(stateWithTwoShips, setGameState(GameState.Finished))).toEqual(stateWithTwoShips);
  });
});
