import '../../locales/i18n';
import { Action } from 'redux';
import {Provider} from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import Header from './header';
import { PlayersDataType } from '../../types';
import { NameSpace } from '../../const';

const mockStore = configureMockStore<
  {[NameSpace.ActivePlayer]: PlayersDataType},
  Action
>();

const renderHeader = (store: MockStore) => {
  render (
    <Provider store={store}>
      <Header />
    </Provider>,
  );
};

describe('Header', () => {
  const store = mockStore();
  it('should render an image and a navbar', () => {
    renderHeader(store);

    expect(screen.getByRole('img', { name: 'Warship' })).toBeInTheDocument();
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });
});
