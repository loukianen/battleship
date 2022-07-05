import {render, screen} from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../../store/root-reducer';
import { Provider } from 'react-redux';
import App from './app';
import connector from '../../services/connector-UI-game';
import { NameSpace } from '../../const';

describe('App', () => {
  const storeProto = configureStore({reducer});
  let store: typeof storeProto;

  beforeEach(() => {
    store = configureStore({reducer});
  });

  it('sould render Heared, Fieds and Footer', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('fields')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should upgrade store', () => {
    const initState = { user:{}, robots:[] };
    const players = connector.getPlayers();

    const stateBeforeAppRendering = store.getState();
    expect(stateBeforeAppRendering[NameSpace.AvailablePlayers]).toEqual(initState);

    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const stateAfterAppRendering = store.getState();
    expect(stateAfterAppRendering[NameSpace.AvailablePlayers]).toEqual(players);
  });
});
