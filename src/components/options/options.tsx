import '../language-dropdown-item/language-dropdown-item.sass';
import { SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import OptionsDropdownItem from '../options-dropdown-item/options-dropdown-item';
import { fieldTypes } from '../../const';

const Options = () => {
  const { t } = useTranslation();

  const optionsDropdownId = 'optDropdown';
  const ddOptionsMenuButtonId = 'ddOptMenuButton';

  const handleChooseOption = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLSelectElement;
    console.log(evt.type, target.name, target.value);
    // const target = document.getElementById('options-form');
    // const formData = new FormData(target as HTMLFormElement);
    // const { name, value } = target;
    // alert(`${name}: ${value}`);
    // console.log(formData.keys());
    // Array .arrayFrom(formData.values()).forEach(element => {
      
    // }); {
    //   console.log(value);
    // }
  };

  const player1Values = [{ value : 'user', text: 'User' }, { value : 'jack', text: 'Jack' }];
  const player2Values = [{ value : 'jack', text: 'Jack' }];
  const fieldValues = fieldTypes.map((fieldType) => ({ value : fieldType, text: fieldType })).reverse();
  const shipValues = [{ value : 'line', text: 'Only line' }];

  return (
    <div className="dropdown text-center" id={optionsDropdownId} data-testid={optionsDropdownId} role="menu">
      <button type="button" className="btn btn-light nav-btn dropdown-toggle" id={ddOptionsMenuButtonId} data-bs-toggle="dropdown" data-testid="optionsComponent" aria-expanded="false">{t('ui.navOptions')}</button>
      <ul className="dropdown-menu" aria-labelledby={ddOptionsMenuButtonId} data-testid="optionsMenu" onChange={handleChooseOption}>
        <OptionsDropdownItem label="First player" itemName="player1" values={player1Values} defaultValue={player1Values[0].value} />
        <OptionsDropdownItem label="Second player" itemName="player2" values={player2Values} defaultValue={player2Values[0].value} />
        <li><hr className="dropdown-divider" /></li>
        <OptionsDropdownItem label="Field type" itemName="field" values={fieldValues} defaultValue={fieldValues[0].value} />
        <li><hr className="dropdown-divider" /></li>
        <OptionsDropdownItem label="Ships type" itemName="ship" values={shipValues} defaultValue={shipValues[0].value} />
      </ul>
    </div>
  );
};
/**/

export default Options;
