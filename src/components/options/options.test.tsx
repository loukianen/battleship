import '../../locales/i18n';
import {Provider} from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import Options from './options';
import { initialAvailablePlayersState } from '../../store/available-players-process/available-players-process';
import { initialGameOptionsState } from '../../store/game-options-process/game-options-process';
import { NameSpace } from '../../const';

const mockStore = configureMockStore();

const renderOptions = (store: MockStore) => {
  render (
    <Provider store={store}>
      <Options />
    </Provider>,
  );
};

describe('Options', () => {
  const initState = { initialGameOptionsState, players: [{id: 'user', name: 'user'}, {id: 'nahimov', name: 'unknown'}]};
  it('should show dropdown menu', () => {
    const store = mockStore({
      [NameSpace.AvailablePlayers]: initialAvailablePlayersState,
      [NameSpace.GameOptions]: initState,
    });
    renderOptions(store);

    userEvent.click(screen.getByTestId('optionsButton'));
    expect(screen.getByTestId('optionsMenu')).toBeInTheDocument();
    expect(screen.getByText('An admiral of first fleet')).toBeInTheDocument();
    expect(screen.getByText('An admiral of second fleet')).toBeInTheDocument();
    expect(screen.getByText('Battle field size')).toBeInTheDocument();
    expect(screen.getByText('Ship type')).toBeInTheDocument();
  });
});
