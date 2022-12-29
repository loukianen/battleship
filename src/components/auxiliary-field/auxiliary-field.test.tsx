import '../../locales/i18n';
import {Provider} from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import AuxiliaryField from './auxiliary-field';
import { initialDockState } from '../../store/dock-process/dock-process';
import { initialInfoState } from '../../store/info-process/info-process';
import { GameState, NameSpace, PlayerType, ShootResult } from '../../const';

const mockStore = configureMockStore();
const gameOptions = { players: [
  {id: 'user', name: 'user', type: PlayerType.Human},
  {id: 'jack', name: 'Jack', type: PlayerType.Robot},
],
};
const logState = [
  [3, 1, {x: 1, y: 1}, ShootResult.OffTarget],
  [2, 0, {x: 2, y: 1}, ShootResult.OffTarget],
  [1, 0, {x: 2, y: 2}, ShootResult.Wounded],
];

const renderAuxiliaryField = (store: MockStore) => {
  render (
    <Provider store={store}>
      <AuxiliaryField />
    </Provider>,
  );
};

describe('Auxiliary Field', () => {
  it('should show Info and Dock and should not show Log if game state is not started', () => {
    const store = mockStore({
      [NameSpace.Dock]: initialDockState,
      [NameSpace.GameState]: GameState.NotStarted,
      [NameSpace.GameOptions]: gameOptions,
      [NameSpace.Billboard]: initialInfoState,
    });
    renderAuxiliaryField(store);

    expect(screen.getByTestId('info')).toBeInTheDocument();
    expect(screen.getByTestId('dock')).toBeInTheDocument();
    expect(screen.queryByTestId('log')).not.toBeInTheDocument();
  });

  it('should show Info and Dock and should not show Log if game state is fleet setting', () => {
    const store = mockStore({
      [NameSpace.Dock]: initialDockState,
      [NameSpace.GameState]: GameState.SettingFleet,
      [NameSpace.GameOptions]: gameOptions,
      [NameSpace.Billboard]: initialInfoState,
    });
    renderAuxiliaryField(store);

    expect(screen.getByTestId('info')).toBeInTheDocument();
    expect(screen.getByTestId('dock')).toBeInTheDocument();
    expect(screen.queryByTestId('log')).not.toBeInTheDocument();
  });

  it('should show Info and Log and should not show Dock if game state is started', () => {
    const store = mockStore({
      [NameSpace.Dock]: initialDockState,
      [NameSpace.GameState]: GameState.Started,
      [NameSpace.GameOptions]: gameOptions,
      [NameSpace.Log]: logState,
      [NameSpace.Billboard]: initialInfoState,
    });
    renderAuxiliaryField(store);

    expect(screen.getByTestId('info')).toBeInTheDocument();
    expect(screen.getByTestId('log')).toBeInTheDocument();
    expect(screen.queryByTestId('dock')).not.toBeInTheDocument();
  });

  it('should show Info and Log and should not show Dock if game state is finished', () => {
    const store = mockStore({
      [NameSpace.Dock]: initialDockState,
      [NameSpace.GameState]: GameState.Finished,
      [NameSpace.GameOptions]: gameOptions,
      [NameSpace.Log]: logState,
      [NameSpace.Billboard]: initialInfoState,
    });
    renderAuxiliaryField(store);

    expect(screen.getByTestId('info')).toBeInTheDocument();
    expect(screen.getByTestId('log')).toBeInTheDocument();
    expect(screen.queryByTestId('dock')).not.toBeInTheDocument();
  });
});
