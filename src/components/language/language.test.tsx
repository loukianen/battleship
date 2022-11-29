import '../../locales/i18n';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Language from '../language/language';
import { act } from 'react-dom/test-utils';

describe('Language', () => {
  it('a click on a current language button should set this language at the app', () => {
    render(<Language />);
    act(() => {
      userEvent.click(screen.getByTestId('languageButton'));
    });
    act(() => {
      userEvent.click(screen.getByTestId('ruButton'));
    })
    expect(screen.getByText('Язык')).toBeInTheDocument();
    
    act(() => {
      userEvent.click(screen.getByTestId('enButton'));
    });
    expect(screen.getByText('Language')).toBeInTheDocument();
  });
});
