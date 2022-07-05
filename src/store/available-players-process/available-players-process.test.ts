import availablePlayersProcess, { setAvailablePlayers } from './available-players-process';
import connector from '../../services/connector-UI-game';

const players = connector.getPlayers();
const initialState = { user:{}, robots:[] };

describe('Reducer: availablePlayersProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(availablePlayersProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialState);
  });

  it('should update players by set data', () => {
    expect(availablePlayersProcess.reducer(initialState, setAvailablePlayers(players)))
      .toEqual(players);
  });
});
