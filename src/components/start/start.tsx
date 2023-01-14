import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import connector from '../../services/connector-UI-game';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import getFieldData from '../../services/gen-field-data';
import { fillDock } from '../../store/dock-process/dock-process';
import { getFieldType, getShipType } from '../../store/game-options-process/selectors';
import { getDock } from '../../store/dock-process/selectors';
import { getGameState } from '../../store/game-state-process/selectors';
import { getGameType } from '../../store/game-type-process/selectors';
import { getPlayers } from '../../store/game-options-process/selectors';
import { setFields } from '../../store/fields-process/fields-process';
import { setGameState } from '../../store/game-state-process/game-state-process';
import { FieldName, GameState, GameType, shipMainClasses } from '../../const';
import { UserFleet } from '../../types';
import { Dispatch, SetStateAction } from 'react';
import { WarningModalType } from '../warning-modal/warning-modal';
import { createUserFleet, generateShipsList } from '../../services/utils';

const isDockEmpty = (dock: UserFleet) => shipMainClasses.every((item) => dock[item].length === 0);

const Start = (props: { onShowWarning: Dispatch<SetStateAction<WarningModalType>>} ) => {
  const { onShowWarning } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const dock = useAppSelector(getDock);
  const gameState = useAppSelector(getGameState);
  const gameType = useAppSelector(getGameType);
  const fieldType = useAppSelector(getFieldType);
  const players = useAppSelector(getPlayers);
  const shipType = useAppSelector(getShipType);

  const getButtonLabel = () => {
    switch (gameState) {
      case GameState.NotStarted:
        return t('ui.navStart');
      case GameState.SettingFleet:
        return t('ui.startBattle');
      default:
        return t('ui.newGame');
    };
  };

  const startBattle = () => {
    dispatch(setGameState(GameState.Battle));
    const playerIds = players.map(({id}) => id);
    connector.startGame(playerIds, gameType, fieldType, dispatch);
  };
  
  const handleClick = () => {
    if (gameState === GameState.SettingFleet) {
      if (gameType === GameType.Auto) {
        startBattle();
      } else if (!isDockEmpty(dock)) {
        onShowWarning({
          text: t('alert.putYourShips'),
          dispatch: () => null,
          show: true });
      } else {
      onShowWarning({
        text: t('alert.haveYouFinishedPlacing'),
        dispatch: () => startBattle(),
        show: true });
      }
    } else if(gameState === GameState.Battle) {
      const newFieldsState = {
        [FieldName.First]: getFieldData(fieldType),
        [FieldName.Second]: getFieldData(fieldType),
      };
      const shipList = generateShipsList(fieldType);
      const newDockState: UserFleet = createUserFleet(shipList, shipType);

      onShowWarning({
        text: [t('alert.restart'), t('alert.areYouSureToContinue')],
        dispatch: () => {
          dispatch(setFields(newFieldsState));
          dispatch(fillDock(newDockState));
          dispatch(setGameState(GameState.SettingFleet));
        },
        show: true });
    } else {
      dispatch(setGameState(GameState.SettingFleet));
    }
  };

  const buttonLabel = getButtonLabel();

  return (
    <Button className="btn btn-light nav-btn" data-testid="startComponent" onClick={handleClick}>{buttonLabel}</Button>
  );
};

export default Start;
