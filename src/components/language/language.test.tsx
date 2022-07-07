import '../../locales/i18n';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Language from '../language/language';

describe('Language', () => {
  it('the "language" button should toggle  "show" class in the dropdown menu element', () => {
    render(<Language />);

    const languageMenuButton = screen.getByTestId('languageButton');
    const languageMenu = screen.getByTestId('languageMenu');
    expect(languageMenuButton).toBeInTheDocument();
    expect(languageMenu.className).not.toContain('show');

    userEvent.click(languageMenuButton);
    expect(languageMenu.className).toContain('show');

    userEvent.click(languageMenuButton);
    expect(languageMenu.className).not.toContain('show');
  });

  it('a click on a current language button should set this language at the app', () => {
    render(<Language />);

    userEvent.click(screen.getByTestId('languageButton'));
    userEvent.click(screen.getByTestId('ruButton'));
    expect(screen.getByText('Язык')).toBeInTheDocument();
    
    userEvent.click(screen.getByTestId('enButton'));
    expect(screen.getByText('Language')).toBeInTheDocument();
  });
});
