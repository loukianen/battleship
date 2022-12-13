import './language-dropdown-item.sass';
import { LanguageType } from "../../const";
import { MouseEvent } from 'react';
import { uniqueId } from '../../services/utils';

const getLanguage = (lang: LanguageType) => {
  const mapping = {
    en: 'english',
    ru: 'russian',
  };
  return mapping[lang] ?? `${uniqueId()}wrong`;
};

type LangDropdownItemProps = {
  lang: LanguageType,
  title: string,
  isActive: boolean,
  onClickFunc: (evt: MouseEvent) => void,
};

const LanguageDropdownItem = (props: LangDropdownItemProps) => {
  const { lang, title, onClickFunc, isActive } = props;
  const language = getLanguage(lang);

  const constPartClassName = 'lang-menu-button';
  const activePartClassName = isActive ? ' lang-menu-button__active' : '';
  const buttonClassName = `${constPartClassName}${activePartClassName}`;

  return (
    <li className="dropdown-item dropdown-menu-end dropdown-item_lang align-items-stretch d-flex flex-row">
      <button className={buttonClassName} id={`${language}Language`} data-testid={`${lang}Button`} lang={lang} onClick={onClickFunc}>
      <img className="flag rounded" src={`img/${language}_fl.png`} alt={`${language} flag`} />
        {title}
      </button>
    </li>
  );
};

export default LanguageDropdownItem;
