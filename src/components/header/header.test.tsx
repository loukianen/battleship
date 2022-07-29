import '../../locales/i18n';
import {Provider} from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import Header from './header';
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
    [NameSpace.AvailablePlayers]: {user: {id: 'user', name: 'user'}, robots: [{id: 'jack', name: 'jack'}]},
  });
  it('should render an image and a navbar', () => {
    renderHeader(store);

    expect(screen.getByRole('img', { name: 'Warship' })).toBeInTheDocument();
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });
});
