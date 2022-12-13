import { MouseEvent } from 'react';
import { useCallback } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import LanguageDropdownItem from '../language-dropdown-item/language-dropdown-item';
import { LanguageType } from '../../const';

const en = LanguageType.En;
const ru = LanguageType.Ru;

const Language = () => {
  const { t, i18n } = useTranslation();
  const isLanguageActive = (lang: string) => i18n.language === lang;

  const handleLangButtonClick = useCallback((evt: MouseEvent) => {
    let node = evt.target as HTMLElement;
    const newLanguage = node.getAttribute('lang') as string;
    i18n.changeLanguage(newLanguage);
  }, [i18n]);

  return (
    <Dropdown as={ButtonGroup} className="text-center" data-testid="langDropdown">
      <Dropdown.Toggle className="btn-light nav-btn" data-testid="languageButton">{t('ui.navLanguage')}</Dropdown.Toggle>
      <Dropdown.Menu data-testid="languageMenu">
        <Dropdown.Item as={LanguageDropdownItem} lang={en} title={t('ui.englishLanguage')} isActive={isLanguageActive(en)} onClick={handleLangButtonClick} />
        <Dropdown.Item as={LanguageDropdownItem} lang={ru} title={t('ui.russianLanguage')} isActive={isLanguageActive(ru)} onClick={handleLangButtonClick} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Language;
