import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageDropdownItem from './language-dropdown-item';
import { LanguageType } from '../../const';

describe('LanguageDropdownItem', () => {
  const onClick = jest.fn();
  const options: [LanguageType, string, string, string, string, string][] = [
    [LanguageType.Ru, 'Русский', 'russianLanguage', 'ruButton', 'img/russian_fl.png', 'russian flag'],
    [LanguageType.En, 'English', 'englishLanguage', 'enButton', 'img/english_fl.png', 'english flag'],
  ];

  it.each(options)('should renred correct element for %s', (lang, title, buttonId, buttonTestId, fileName, altText) => {
    render(<LanguageDropdownItem lang={lang} title={title} onClick={onClick} isActive={false} />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toBe(fileName);
    expect(img.getAttribute('alt')).toBe(altText);

    const button = screen.getByTestId(buttonTestId);

    expect(button).toBeInTheDocument();
    expect(button.getAttribute('id')).toBe(buttonId);

      userEvent.click(button);
    expect(onClick).toBeCalledTimes(1);
  });
});
