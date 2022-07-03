import {render, screen} from '@testing-library/react';
import App from './app';

describe('App', () => {
  it('sould render Heared, Fieds and Footer', () => {
    render(
      <App />,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('fields')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
