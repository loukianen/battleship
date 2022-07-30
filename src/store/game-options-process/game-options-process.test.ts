import gameOptionsProcess, { initialGameOptionsState, setGameOptions } from './game-options-process';
import { setAvailablePlayers } from '../available-players-process/available-players-process';
import { fieldTypes, ShipShapes } from '../../const';

describe('Reducer: gameOptionsProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(gameOptionsProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialGameOptionsState);
  });

  it('should update players by set data', () => {
    const newPlayers = { players: [{id: 'newId', name: 'playerName'}, {id: 'unknown', name: 'unknown'}]};
    const stateWithChangedPlayers = { ...initialGameOptionsState, ...newPlayers };
    expect(gameOptionsProcess.reducer(initialGameOptionsState, setGameOptions(newPlayers))).toEqual(stateWithChangedPlayers);

    const newFieldType = { fieldType: fieldTypes[0]};
    const stateWithChangedFieldType = { ...initialGameOptionsState, ...newFieldType };
    expect(gameOptionsProcess.reducer(initialGameOptionsState, setGameOptions(newFieldType))).toEqual(stateWithChangedFieldType);

    const newShipType = { shipType: ShipShapes.Any};
    const stateWithChangedShipType = { ...initialGameOptionsState, ...newShipType };
    expect(gameOptionsProcess.reducer(initialGameOptionsState, setGameOptions(newShipType))).toEqual(stateWithChangedShipType);
  });

  it('should set the user as first player and first robot as second player when happening available players receiving', () => {
    const availablePlayers = { user: { id: 'firstId', name: 'userName' }, robots: [{ id: 'secondId', name: 'robotName' }] };
    const stateWithChangedPlayers = { ...initialGameOptionsState, players: [availablePlayers.user, availablePlayers.robots[0]] };

    expect(gameOptionsProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialGameOptionsState);
    expect(gameOptionsProcess.reducer(initialGameOptionsState, setAvailablePlayers(availablePlayers))).toEqual(stateWithChangedPlayers);
  });
});
