import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import WarningModal, { defaultWarningModalProps, WarningModalType } from '../warning-modal/warning-modal';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getGameState } from '../../store/game-state-process/selectors';
import { setGameState } from '../../store/game-state-process/game-state-process';
import { GameStates } from '../../const';

const Start = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const gameState = useAppSelector(getGameState);
  const [warningModalState, setWarningModalState] = useState(defaultWarningModalProps as WarningModalType);

  const getButtonLabel = () => {
    switch (gameState) {
      case GameStates.NotStarted:
        return t('ui.navStart');
      case GameStates.SettingFleet:
        return t('ui.startBattle');
      default:
        return t('ui.newGame');
    };
  };
  
  const handleClick = () => {
    if (gameState === GameStates.SettingFleet) {
      setWarningModalState({
        text: t('alert.haveYouFinishedPlacing'),
        dispatch: () => dispatch(setGameState(GameStates.Started)),
        show: true });
    } else if(gameState === GameStates.Started) {
      setWarningModalState({
        text: [t('alert.restart'), t('alert.areYouSureToContinue')],
        dispatch: () => dispatch(setGameState(GameStates.SettingFleet)),
        show: true });
    } else {
      dispatch(setGameState(GameStates.SettingFleet));
    }
  };

  const buttonLabel = getButtonLabel();

  return (
    <>
      <WarningModal { ...warningModalState } />
      <Button className="btn btn-light nav-btn" data-testid="startComponent" onClick={handleClick}>{buttonLabel}</Button>
    </>
  );
};

export default Start;
