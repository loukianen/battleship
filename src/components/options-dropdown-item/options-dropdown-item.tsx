import './options-dropdown-item.sass';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import { OptionsMenuKey } from '../../locales/types';

type OptionsDropdownItemProps = {
  itemName: string;
  options: { value : string, text: string }[];
  curValue: string;
};

const OptionsDropdownItem = (props: OptionsDropdownItemProps) => {
  const { itemName, options, curValue } = props;
  const { t } = useTranslation();

  const menuKey = itemName as OptionsMenuKey;
  const isOnlyOneValue = options.length < 2;

  return (
    <Form.Group className="dropdown-item">
      <Form.Label className="dropdown-item_label" data-testid={`options-menu-label-${itemName}`}>{t(`optionsMenu.${menuKey}`)}</Form.Label>
      <Form.Select className="form-select dropdown-item dropdown-item_select" name={itemName} defaultValue={curValue} disabled={isOnlyOneValue}>
      {options.map(({value, text}) =>  (<option className="dropdown-item_option" data-testid={`options-menu-${value}`} key={value} value={value}>{text}</option>))}
      </Form.Select>
    </Form.Group>
  );
};

export default OptionsDropdownItem;
