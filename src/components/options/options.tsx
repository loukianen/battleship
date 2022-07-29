import '../language-dropdown-item/language-dropdown-item.sass';
import { SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/hooks';
import { getUser, getRobots } from '../../store/available-players-process/selectors';
import OptionsDropdownItem from '../options-dropdown-item/options-dropdown-item';
import { fieldTypes, ShipShapes } from '../../const';
import { OptionsMenuKeys } from '../../locales/types';
import { PlayerDataType } from '../../types';

const getDefaultValue = (values: { value : string, text: string }[]) => values[0] ? values[0].value : '';

const Options = () => {
  const { t, i18n } = useTranslation();
  const getPlayerValues = (users: PlayerDataType[]) => users.map(
    ({id, name }) => {
      const value = id;
      let text = name;
      if (i18n.exists(`optionsMenu.${id}`)) {
        const menuKey = id as OptionsMenuKeys;
        text = t(`optionsMenu.${menuKey}`);
      }
      return { value, text };
    });

  const user = useAppSelector(getUser);
  const robots = useAppSelector(getRobots);
  
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

  const player2Values = getPlayerValues(robots);
  const player1Values = [...getPlayerValues([user]), ...player2Values];
  const fieldValues = fieldTypes.map((fieldType) => ({ value : fieldType, text: t(`optionsMenu.${fieldType}`) })).reverse();

  const shipType = ShipShapes.Line;
  const shipValues = [{ value : shipType, text: t(`optionsMenu.${shipType}`) }];

  return (
    <div className="dropdown text-center" id={optionsDropdownId} data-testid={optionsDropdownId} role="menu">
      <button type="button" className="btn btn-light nav-btn dropdown-toggle" id={ddOptionsMenuButtonId} data-bs-toggle="dropdown" data-testid="optionsComponent" aria-expanded="false">{t('ui.navOptions')}</button>
      <ul className="dropdown-menu" aria-labelledby={ddOptionsMenuButtonId} data-testid="optionsMenu" onChange={handleChooseOption}>
        <OptionsDropdownItem itemName="player1" values={player1Values} defaultValue={getDefaultValue(player1Values)} />
        <OptionsDropdownItem itemName="player2" values={player2Values} defaultValue={getDefaultValue(player2Values)} />
        <li><hr className="dropdown-divider" /></li>
        <OptionsDropdownItem itemName="fieldSize" values={fieldValues} defaultValue={fieldValues[0].value} />
        <li><hr className="dropdown-divider" /></li>
        <OptionsDropdownItem itemName="shipType" values={shipValues} defaultValue={shipValues[0].value} />
      </ul>
    </div>
  );
};
/**/

export default Options;
