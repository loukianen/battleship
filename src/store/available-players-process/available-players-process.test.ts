import availablePlayersProcess, { initialAvailablePlayersState, setAvailablePlayers } from './available-players-process';
import connector from '../../services/connector-UI-game';

const players = connector.getPlayers();

describe('Reducer: availablePlayersProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(availablePlayersProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialAvailablePlayersState);
  });

  it('should update players by set data', () => {
    expect(availablePlayersProcess.reducer(initialAvailablePlayersState, setAvailablePlayers(players)))
      .toEqual(players);
  });
});
