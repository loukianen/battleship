import '../language-dropdown-item/language-dropdown-item.sass';
import { SyntheticEvent } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/hooks';
import { getUser, getRobots } from '../../store/available-players-process/selectors';
import { getPlayers, getFieldType, getShipType } from '../../store/game-options-process/selectors';
import OptionsDropdownItem from '../options-dropdown-item/options-dropdown-item';
import { fieldTypes, shipTypes } from '../../const';
import { OptionsMenuKeys } from '../../locales/types';
import { PlayerDataType } from '../../types';

const Options = () => {
  const { t, i18n } = useTranslation();
  const getPlayerValues = (users: PlayerDataType[]) => users.map(
    ({id, name }) => {
      let text: string = name;
      if (i18n.exists(`optionsMenu.${id}`)) {
        const menuKey = id as OptionsMenuKeys;
        text = t(`optionsMenu.${menuKey}`);
      }
      return { value: id, text };
    });

  const user = useAppSelector(getUser);
  const robots = useAppSelector(getRobots);
  const curShipType = useAppSelector(getShipType) as OptionsMenuKeys;
  const curFieldType = useAppSelector(getFieldType) as OptionsMenuKeys;
  const [player1, player2] = useAppSelector(getPlayers);
  
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

  const player2Options = getPlayerValues(robots);
  const player1Options = [...getPlayerValues([user]), ...player2Options];

  const fieldOptions = fieldTypes.map((fieldType) => ({ value : fieldType, text: t(`optionsMenu.${fieldType}`) }));

  const shipOptions = shipTypes.map((shipType) => ({ value : shipType, text: t(`optionsMenu.${shipType}`) }));

  return (
    <Dropdown as={ButtonGroup} className="text-center" data-testid="optDropdown">
      <Dropdown.Toggle className="btn-light nav-btn" data-testid="optionsComponent">{t('ui.navOptions')}</Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu" data-testid="optionsMenu" onChange={handleChooseOption}>
        <Dropdown.Item as={OptionsDropdownItem} itemName="player1" options={player1Options} curValue={player1.id} />
        <Dropdown.Item as={OptionsDropdownItem} itemName="player2" options={player2Options} curValue={player2.id} />
        <Dropdown.Divider />
        <Dropdown.Item as={OptionsDropdownItem} itemName="fieldSize" options={fieldOptions} curValue={curFieldType} />
        <Dropdown.Divider />
        <Dropdown.Item as={OptionsDropdownItem} itemName="shipType" options={shipOptions} curValue={curShipType} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Options;
