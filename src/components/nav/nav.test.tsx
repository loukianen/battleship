import '../../locales/i18n';
import { Action } from 'redux';
import {Provider} from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import Nav from './nav';
import { PlayersDataType } from '../../types';
import { NameSpace } from '../../const';

const mockStore = configureMockStore<
  {[NameSpace.ActivePlayer]: PlayersDataType},
  Action
>();

const renderComponent = (store: MockStore) => {
  render (
    <Provider store={store}>
      <Nav />
    </Provider>,
  );
};

describe('Nav', () => {
  const store = mockStore();
  it('should render all menu components', () => {
    renderComponent(store);

    expect(screen.getByTestId('startComponent')).toBeInTheDocument();
    expect(screen.getByTestId('optionsComponent')).toBeInTheDocument();
    expect(screen.getByTestId('langDropdown')).toBeInTheDocument();
  });
});
