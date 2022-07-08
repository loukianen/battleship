import './language-dropdown-item.sass';
import { Language } from "../../types";
import { MouseEvent } from 'react';
import { uniqueId } from '../../services/utils';

const getLanguage = (lang: Language) => {
  const mapping = {
    en: 'english',
    ru: 'russian',
  };
  return mapping[lang] ?? `${uniqueId()}wrong`;
};

type LangDropdownItemProps = {
  lang: Language,
  title: string,
  isActive: boolean,
  onClick: (evt: MouseEvent) => void,
};

const LanguageDropdownItem = (props: LangDropdownItemProps) => {
  const { lang, title, onClick, isActive } = props;
  const language = getLanguage(lang);

  const constPartClassName = 'lang-menu-button';
  const activePartClassName = isActive ? ' lang-menu-button__active' : '';
  const buttonClassName = `${constPartClassName}${activePartClassName}`;

  return (
    <li className="dropdown-item dropdown-menu-end dropdown-item_lang align-items-stretch d-flex flex-row">
      <button className={buttonClassName} id={`${language}Language`} data-testid={`${lang}Button`} lang={lang} onClick={onClick}>
      <img className="flag rounded" src={`img/${language}_fl.png`} alt={`${language} flag`} />
        {title}
      </button>
    </li>
  );
};

export default LanguageDropdownItem;
