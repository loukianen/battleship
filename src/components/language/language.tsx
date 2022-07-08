import { MouseEvent } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageDropdownItem from '../language-dropdown-item/language-dropdown-item';

const langDropdownId = 'langDropdown';
const ddLangMenuButtonId = 'ddLangMenuButton';

const Language = () => {
  const { t, i18n } = useTranslation();
  const isLanguageActive = (lang: string) =>i18n.language === lang;

  const handleLangButtonClick = useCallback((evt: MouseEvent) => {
    const node = evt.target as HTMLElement; 
    const newLanguage = node.getAttribute('lang') as string;
    i18n.changeLanguage(newLanguage);
  }, [i18n]);

  return (
    <div className="dropdown text-center" id={langDropdownId} data-testid={langDropdownId} role="menu">
      <button type="button" className="btn btn-light nav-btn dropdown-toggle" id={ddLangMenuButtonId} data-bs-toggle="dropdown" data-testid="languageButton" aria-expanded="false">{t('ui.navLanguage')}</button>
      <ul className="dropdown-menu" aria-labelledby={ddLangMenuButtonId} data-testid="languageMenu">
        <LanguageDropdownItem lang="en" title={t('ui.englishLanguage')} isActive={isLanguageActive('en')} onClick={handleLangButtonClick} />
        <LanguageDropdownItem lang="ru" title={t('ui.russianLanguage')} isActive={isLanguageActive('ru')} onClick={handleLangButtonClick} />
      </ul>
    </div>
  );
};

export default Language;
