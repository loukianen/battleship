import gameOptionsProcess, { initialGameOptionsState, setGameOptions } from './game-options-process';
import { setAvailablePlayers } from '../available-players-process/available-players-process';
import { PlayerType } from '../../const';

describe('Reducer: gameOptionsProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(gameOptionsProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialGameOptionsState);
  });

  it('should set data', () => {
    const newPlayers = { players: [{id: 'newId', name: 'playerName', type: PlayerType.Human}, {id: 'unknown', name: 'unknown', type: PlayerType.Robot}]};
    const stateWithChangedPlayers = { ...initialGameOptionsState, ...newPlayers };
    expect(gameOptionsProcess.reducer(initialGameOptionsState, setGameOptions(stateWithChangedPlayers))).toEqual(stateWithChangedPlayers);
  });

  it('should set the user as first player and first robot as second player when happening available players receiving', () => {
    const availablePlayers = { user: { id: 'firstId', name: 'userName', type: PlayerType.Human }, robots: [{ id: 'secondId', name: 'robotName', type: PlayerType.Robot }] };
    const stateWithChangedPlayers = { ...initialGameOptionsState, players: [availablePlayers.user, availablePlayers.robots[0]] };

    expect(gameOptionsProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialGameOptionsState);
    expect(gameOptionsProcess.reducer(initialGameOptionsState, setAvailablePlayers(availablePlayers))).toEqual(stateWithChangedPlayers);
  });
});
