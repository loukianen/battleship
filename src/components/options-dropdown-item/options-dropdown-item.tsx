import { useTranslation } from 'react-i18next';
import { OptionsMenuKeys } from '../../locales/types';

type OptionsDropdownItemProps = {
  itemName: string;
  options: { value : string, text: string }[];
  curValue: string;
};

const OptionsDropdownItem = (props: OptionsDropdownItemProps) => {
  const { itemName, options, curValue } = props;
  const { t } = useTranslation();

  const menuKey = itemName as OptionsMenuKeys;
  const selectId = `options-${itemName}`;
  const isOnlyOneValue = options.length < 2;
  const ariaLabel = isOnlyOneValue ? 'Disabled' : 'Default';

  return (
    <li className="dropdown-item">
      <label htmlFor={selectId}><b>{t(`optionsMenu.${menuKey}`)}</b></label>
      <select className="form-select dropdown-item" id={selectId} name={itemName} aria-label={ariaLabel} disabled={isOnlyOneValue}>
        {options.map(({value, text}) =>  (<option key={value} value={value} selected={value === curValue}>{text}</option>))}
      </select>
    </li>
  );
};

export default OptionsDropdownItem;
