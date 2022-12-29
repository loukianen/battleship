import '../../locales/i18n';
import {Provider} from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { initialDockState } from '../../store/dock-process/dock-process';
import { initialGameOptionsState } from '../../store/game-options-process/game-options-process';
import Dock from './dock';
import { GameState, NameSpace } from '../../const';

const mockStore = configureMockStore();

const renderDock = (store: MockStore) => {
  render (
    <Provider store={store}>
      <Dock />
    </Provider>,
  );
};

describe('Dock', () => {
  it('should render element with dock test id', () => {
    const store = mockStore({
      [NameSpace.GameState]: GameState.NotStarted,
      [NameSpace.GameOptions]: initialGameOptionsState,
      [NameSpace.Dock]: initialDockState,
    });

    renderDock(store);

    expect(screen.getByTestId('dock')).toBeInTheDocument();
  });
});
