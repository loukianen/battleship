import '../../locales/i18n';
import {Provider} from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import Nav from './nav';
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
    [NameSpace.AvailablePlayers]: {user: {id: 'user', name: 'user'}, robots: [{id: 'jack', name: 'jack'}]},
  });
  it('should render all menu components', () => {
    renderComponent(store);

    expect(screen.getByTestId('startComponent')).toBeInTheDocument();
    expect(screen.getByTestId('optionsComponent')).toBeInTheDocument();
    expect(screen.getByTestId('langDropdown')).toBeInTheDocument();
  });
});
