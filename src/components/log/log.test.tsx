import '../../locales/i18n';
import {Provider} from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import Log from './log';
import english from '../../locales/en';
import {NameSpace, PlayerType, ShootResult } from '../../const';

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

const renderLog = (store: MockStore) => {
  render (
    <Provider store={store}>
      <Log />
    </Provider>,
  );
};

describe('Log', () => {
  it('should render all records', () => {
    const store = mockStore({
      [NameSpace.GameOptions]: gameOptions,
      [NameSpace.Log]: logState,
    });

    renderLog(store);

    expect(screen.getByText(english.optionsMenu.jack)).toBeInTheDocument();
    expect(screen.getAllByText(english.optionsMenu.user).length).toBe(2);
    expect(screen.getByText(english.log[ShootResult.Wounded])).toBeInTheDocument();
    expect(screen.getAllByText(english.log[ShootResult.OffTarget]).length).toBe(2);
    expect(screen.getByText('a1')).toBeInTheDocument();
    expect(screen.getByText('b1')).toBeInTheDocument();
    expect(screen.getByText('b2')).toBeInTheDocument();
  });
});
