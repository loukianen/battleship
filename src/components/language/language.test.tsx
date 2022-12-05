import '../../locales/i18n';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Language from '../language/language';

describe('Language', () => {
  it('a click on a current language button should set this language at the app', () => {
    render(<Language />);
      userEvent.click(screen.getByTestId('languageButton'));
      userEvent.click(screen.getByTestId('ruButton'));
    expect(screen.getByText('Язык')).toBeInTheDocument();
    
      userEvent.click(screen.getByTestId('enButton'));
    expect(screen.getByText('Language')).toBeInTheDocument();
  });
});
