import '../../locales/i18n';
import {Provider} from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import AuxiliaryField from './auxiliary-field';
import { GameState, NameSpace } from '../../const';

const mockStore = configureMockStore();

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
      [NameSpace.GameState]: GameState.NotStarted,
    });
    renderAuxiliaryField(store);

    expect(screen.getByTestId('info')).toBeInTheDocument();
    expect(screen.getByTestId('dock')).toBeInTheDocument();
    expect(screen.queryByTestId('log')).not.toBeInTheDocument();
  });

  it('should show Info and Dock and should not show Log if game state is fleet setting', () => {
    const store = mockStore({
      [NameSpace.GameState]: GameState.SettingFleet,
    });
    renderAuxiliaryField(store);

    expect(screen.getByTestId('info')).toBeInTheDocument();
    expect(screen.getByTestId('dock')).toBeInTheDocument();
    expect(screen.queryByTestId('log')).not.toBeInTheDocument();
  });

  it('should show Info and Log and should not show Dock if game state is started', () => {
    const store = mockStore({
      [NameSpace.GameState]: GameState.Started,
    });
    renderAuxiliaryField(store);

    expect(screen.getByTestId('info')).toBeInTheDocument();
    expect(screen.getByTestId('log')).toBeInTheDocument();
    expect(screen.queryByTestId('dock')).not.toBeInTheDocument();
  });

  it('should show Info and Log and should not show Dock if game state is finished', () => {
    const store = mockStore({
      [NameSpace.GameState]: GameState.Finished,
    });
    renderAuxiliaryField(store);

    expect(screen.getByTestId('info')).toBeInTheDocument();
    expect(screen.getByTestId('log')).toBeInTheDocument();
    expect(screen.queryByTestId('dock')).not.toBeInTheDocument();
  });
});
