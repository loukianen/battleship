import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../../store/root-reducer';
import { Provider } from 'react-redux';
import App from '../app/app';

xdescribe('Language', () => {
  const store = configureStore({reducer});

  it('sould render the menu with two language buttons after click and hide the menu after another click', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    // const languageMenuButton = screen.getByTestId('languageButton');
    // expect(languageMenuButton).toBeInTheDocument();

    // userEvent.click(languageMenuButton);

    expect(screen.getByTestId('ruButton')).toBeInTheDocument();
    expect(screen.getByTestId('enButton')).toBeInTheDocument();
    
    // userEvent.click(languageMenuButton);
    
    // expect(screen.queryByTestId('ruButton')).not.toBeInTheDocument();
    // expect(screen.queryByTestId('enButton')).not.toBeInTheDocument();
  });

  it('should change current language after click on language buttons', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    userEvent.click(screen.getByTestId('languageButton'));
    userEvent.click(screen.getByTestId('enButton'));

    const englishHeader = await waitFor(() => screen.findByText('Battleship'));
    expect(englishHeader).toBeInTheDocument();

    // userEvent.click(screen.getByTestId('languageButton'));
    // userEvent.click(screen.getByTestId('ruButton'));

    // const russianHeader = await screen.findByText('Морской бой');
    // expect(russianHeader).toBeInTheDocument();
  });
});
