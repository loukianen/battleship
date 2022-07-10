type OptionsDropdownItemProps = {
  label: string;
  itemName: string;
  values: { value : string, text: string }[];
  defaultValue: string;
};

const OptionsDropdownItem = (props: OptionsDropdownItemProps) => {
  const { label, itemName, values, defaultValue } = props;
  const selectId = `options-${itemName}`;
  const isOnlyOneValue = values.length < 2;
  const ariaLabel = isOnlyOneValue ? 'Disabled' : 'Default';

  return (
    <li className="dropdown-item">
      <label htmlFor={selectId}>{label}</label>
      <select className="form-select dropdown-item" id={selectId} name={itemName} aria-label={ariaLabel} defaultValue={defaultValue} disabled={isOnlyOneValue}>
        {values.map(({value, text}) => (<option key={value} className="lang-menu-button" value={value}>{text}</option>))}
      </select>
    </li>
  );
};

export default OptionsDropdownItem;
