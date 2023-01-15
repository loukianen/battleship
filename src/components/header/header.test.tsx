import '../../locales/i18n';
import {Provider} from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import Header from './header';
import { initialAvailablePlayersState } from '../../store/available-players-process/available-players-process';
import { initialFieldsState } from '../../store/fields-process/fields-process';
import { initialGameOptionsState } from '../../store/game-options-process/game-options-process';
import { NameSpace } from '../../const';

const mockStore = configureMockStore();

const renderHeader = (store: MockStore) => {
  render (
    <Provider store={store}>
      <Header />
    </Provider>,
  );
};

describe('Header', () => {
  const store = mockStore({
    [NameSpace.AvailablePlayers]: initialAvailablePlayersState,
    [NameSpace.Fields]: initialFieldsState,
    [NameSpace.GameOptions]: initialGameOptionsState,
  });
  it('should render an image and a navbar', () => {
    renderHeader(store);

    expect(screen.getByRole('img', { name: 'Warship' })).toBeInTheDocument();
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });
});
