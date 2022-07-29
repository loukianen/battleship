import { useTranslation } from 'react-i18next';
import { OptionsMenuKeys } from '../../locales/types';

type OptionsDropdownItemProps = {
  itemName: string;
  values: { value : string, text: string }[];
  defaultValue: string;
};

const OptionsDropdownItem = (props: OptionsDropdownItemProps) => {
  const { itemName, values, defaultValue } = props;
  const { t } = useTranslation();

  const menuKey = itemName as OptionsMenuKeys;
  const selectId = `options-${itemName}`;
  const isOnlyOneValue = values.length < 2;
  const ariaLabel = isOnlyOneValue ? 'Disabled' : 'Default';

  return (
    <li className="dropdown-item">
      <label htmlFor={selectId}><b>{t(`optionsMenu.${menuKey}`)}</b></label>
      <select className="form-select dropdown-item" id={selectId} name={itemName} aria-label={ariaLabel} defaultValue={defaultValue} disabled={isOnlyOneValue}>
        {values.map(({value, text}) => (<option key={value} value={value}>{text}</option>))}
      </select>
    </li>
  );
};

export default OptionsDropdownItem;
