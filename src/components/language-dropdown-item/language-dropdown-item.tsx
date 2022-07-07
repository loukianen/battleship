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
  onClick: (evt: MouseEvent) => void,
};

const LanguageDropdownItem = (props: LangDropdownItemProps) => {
  const { lang, title, onClick } = props;
  const language = getLanguage(lang);
  return (
    <li className="dropdown-item dropdown-menu-end dropdown-item__lang align-items-stretch d-flex flex-row ">
      <button className="lang-menu-button" id={`${language}Language`} data-testid={`${lang}Button`} lang={lang} onClick={onClick}>
      <img className="flag rounded" src={`img/${language}_fl.png`} alt={`${language} flag`} />
        {title}
      </button>
    </li>
  );
};

export default LanguageDropdownItem;
