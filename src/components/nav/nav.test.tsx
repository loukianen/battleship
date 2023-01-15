import '../../locales/i18n';
import {Provider} from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import Nav from './nav';
import { initialAvailablePlayersState } from '../../store/available-players-process/available-players-process';
import { initialFieldsState } from '../../store/fields-process/fields-process';
import { initialGameOptionsState } from '../../store/game-options-process/game-options-process';
import { NameSpace } from '../../const';

const mockStore = configureMockStore();

const renderComponent = (store: MockStore) => {
  render (
    <Provider store={store}>
      <Nav />
    </Provider>,
  );
};

describe('Nav', () => {
  const store = mockStore({
    [NameSpace.AvailablePlayers]: initialAvailablePlayersState,
    [NameSpace.GameOptions]: initialGameOptionsState,
    [NameSpace.Fields]: initialFieldsState,
  });
  it('should render all menu components', () => {
    renderComponent(store);

    expect(screen.getByTestId('startComponent')).toBeInTheDocument();
    expect(screen.getByTestId('optionsButton')).toBeInTheDocument();
    expect(screen.getByTestId('langDropdown')).toBeInTheDocument();
  });
});
