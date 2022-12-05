import '../../locales/i18n';
import {Provider} from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import Fields from './fields';
import { initialGameOptionsState } from '../../store/game-options-process/game-options-process';
import { NameSpace } from '../../const';

const mockStore = configureMockStore();

const renderFields = (store: MockStore) => {
  render (
    <Provider store={store}>
      <Fields />
    </Provider>,
  );
};

describe('Fields', () => {
  it('should render admiral names as "Unknown I" and "Unknown II"', () => {
    const store = mockStore({
      [NameSpace.GameOptions]: initialGameOptionsState,
    });
    renderFields(store);

    expect(screen.getByText('Admiral unknown I')).toBeInTheDocument();
    expect(screen.getByText('Admiral unknown II')).toBeInTheDocument();
  });

  it('should render admiral names as "You" and "Nahimov"', () => {
    const store = mockStore({
      [NameSpace.GameOptions]: { ...initialGameOptionsState, players: [{id: 'user', name: 'user'}, {id: 'nahimov', name: 'unknown'}]},
    });
    renderFields(store);

    expect(screen.getByText('Admiral You')).toBeInTheDocument();
    expect(screen.getByText('Admiral Nahimov')).toBeInTheDocument();
  });
});
