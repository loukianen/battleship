import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import getFieldData from '../../services/gen-field-data';
import { fillDock } from '../../store/dock-process/dock-process';
import { getFieldType, getShipType } from '../../store/game-options-process/selectors';
import { getGameState } from '../../store/game-state-process/selectors';
import { setFields } from '../../store/fields-process/fields-process';
import { setGameState } from '../../store/game-state-process/game-state-process';
import { FieldName, GameState } from '../../const';
import { UserFleet } from '../../types';
import { Dispatch, SetStateAction } from 'react';
import { WarningModalType } from '../warning-modal/warning-modal';
import { createUserFleet, generateShipsList } from '../../services/utils';

const Start = (props: { onShowWarning: Dispatch<SetStateAction<WarningModalType>>} ) => {
  const { onShowWarning } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const gameState = useAppSelector(getGameState);
  const fieldType = useAppSelector(getFieldType);
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
  
  const handleClick = () => {
    if (gameState === GameState.SettingFleet) {
      onShowWarning({
        text: t('alert.haveYouFinishedPlacing'),
        dispatch: () => dispatch(setGameState(GameState.Battle)),
        show: true });
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
