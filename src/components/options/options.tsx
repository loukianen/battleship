import '../language-dropdown-item/language-dropdown-item.sass';
import { SyntheticEvent } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { setGameOptions } from '../../store/game-options-process/game-options-process';
import { getUser, getRobots } from '../../store/available-players-process/selectors';
import { getPlayers, getFieldType, getShipType } from '../../store/game-options-process/selectors';
import OptionsDropdownItem from '../options-dropdown-item/options-dropdown-item';
import { fieldTypes, shipTypes, GameOption } from '../../const';
import { OptionsMenuKeys } from '../../locales/types';
import { Player } from '../../types';
import { getLocalizedUsername } from '../../services/utils';

const Options = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const robots = useAppSelector(getRobots);
  const curShipType = useAppSelector(getShipType) as OptionsMenuKeys;
  const curFieldType = useAppSelector(getFieldType) as OptionsMenuKeys;
  const [player1, player2] = useAppSelector(getPlayers);

  const getPlayerValues = (users: Player[]) => users.map(
    ({id, name, type }) => {
      const text = getLocalizedUsername({id, name, type}, i18n);
      return { value: id, text };
    });

  const handleChooseOption = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLSelectElement;
    const { name, value } = target;
    if (name === GameOption.Player1 || name === GameOption.Player2) {
      const newPlayer = [user, ...robots].filter(({id}) => id === value)[0];
      const players = name === GameOption.Player1 ? [newPlayer, player2] : [player1, newPlayer];
      dispatch(setGameOptions({players}));
    } else {
      dispatch(setGameOptions({[name]: value}));
    }
  };

  const player2Options = getPlayerValues(robots);
  const player1Options = [...getPlayerValues([user]), ...player2Options];

  const fieldOptions = fieldTypes.map((fieldType) => ({ value : fieldType, text: t(`optionsMenu.${fieldType}`) }));

  const shipOptions = shipTypes.map((shipType) => ({ value : shipType, text: t(`optionsMenu.${shipType}`) }));

  return (
    <Dropdown as={ButtonGroup} className="text-center" data-testid="optDropdown">
      <Dropdown.Toggle className="btn-light nav-btn" data-testid="optionsButton">{t('ui.navOptions')}</Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu" data-testid="optionsMenu" onChange={handleChooseOption}>
        <Dropdown.Item as={OptionsDropdownItem} itemName={GameOption.Player1} options={player1Options} curValue={player1.id} />
        <Dropdown.Item as={OptionsDropdownItem} itemName={GameOption.Player2} options={player2Options} curValue={player2.id} />
        <Dropdown.Divider />
        <Dropdown.Item as={OptionsDropdownItem} itemName={GameOption.FieldSize} options={fieldOptions} curValue={curFieldType} />
        <Dropdown.Divider />
        <Dropdown.Item as={OptionsDropdownItem} itemName={GameOption.ShipType} options={shipOptions} curValue={curShipType} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Options;
