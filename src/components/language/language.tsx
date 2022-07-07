import { MouseEvent } from 'react';
import { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageDropdownItem from '../language-dropdown-item/language-dropdown-item';

const langDropdownId = 'langDropdown';
const ddLangMenuButtonId = 'ddLangMenuButton';
const borderWidth = 1;
const menuWidth = 160;

const Language = () => {
  const { t, i18n } = useTranslation();
  const [isDropMenuVisible, setIsDropMenuVisible] = useState(false);
  const [menuGorizontalGap, setMenuGorizontalGap] = useState(0);
  const [menuVerticalGap, setMenuVerticalGap] = useState(0);

  const handleLangButtonClick = useCallback((evt: MouseEvent) => {
    const node = evt.target as HTMLElement; 
    const newLanguage = node.getAttribute('lang') as string;
    i18n.changeLanguage(newLanguage);
    setIsDropMenuVisible(false);
  }, [i18n]);

  const handleDropButtonClick = () => {
    setIsDropMenuVisible(!isDropMenuVisible);
  };

  const menuClass = `dropdown-menu${isDropMenuVisible ? ' show' : ''}`;

  // a positioning of menu
  useEffect(() => {
    const dropdownElement = document.getElementById(langDropdownId) as HTMLElement;
    const buttonElement = dropdownElement.children[0];
    const gorizontalGap = (dropdownElement.clientWidth - buttonElement.clientWidth) / 2 + buttonElement.clientWidth - menuWidth + borderWidth;
    const verticalGap = buttonElement.clientHeight + borderWidth * 2;
    if (gorizontalGap !== menuGorizontalGap) {
      setMenuGorizontalGap(gorizontalGap);
    }
    if (verticalGap !== menuVerticalGap) {
      setMenuVerticalGap(verticalGap);
    }
  }, [menuGorizontalGap, menuVerticalGap]);

  return (
    <div className="dropdown text-center" id={langDropdownId} data-testid={langDropdownId} role="menu">
      <button type="button" className="btn btn-light nav-btn dropdown-toggle" id={ddLangMenuButtonId} data-toggle="dropdown" data-testid="languageButton" aria-expanded="false" onClick={handleDropButtonClick}>{t('ui.navLanguage')}</button>
      <ul className={menuClass} style={{top: `${menuVerticalGap}px`, left: `${menuGorizontalGap}px`}} aria-labelledby={ddLangMenuButtonId} data-testid="languageMenu">
        <LanguageDropdownItem lang="en" title={t('ui.englishLanguage')} onClick={handleLangButtonClick} />
        <LanguageDropdownItem lang="ru" title={t('ui.russianLanguage')} onClick={handleLangButtonClick} />
      </ul>
    </div>
  );
};

export default Language;
