import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getGameState } from '../../store/game-state-process/selectors';
import { setGameState } from '../../store/game-state-process/game-state-process';
import { GameStates } from '../../const';
import { Dispatch, SetStateAction } from 'react';
import { WarningModalType } from '../warning-modal/warning-modal';

const Start = (props: { onShowWarning: Dispatch<SetStateAction<WarningModalType>>} ) => {
  const { onShowWarning } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const gameState = useAppSelector(getGameState);

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
      onShowWarning({
        text: t('alert.haveYouFinishedPlacing'),
        dispatch: () => dispatch(setGameState(GameStates.Started)),
        show: true });
    } else if(gameState === GameStates.Started) {
      onShowWarning({
        text: [t('alert.restart'), t('alert.areYouSureToContinue')],
        dispatch: () => dispatch(setGameState(GameStates.SettingFleet)),
        show: true });
    } else {
      dispatch(setGameState(GameStates.SettingFleet));
    }
  };

  const buttonLabel = getButtonLabel();

  return (
    <Button className="btn btn-light nav-btn" data-testid="startComponent" onClick={handleClick}>{buttonLabel}</Button>
  );
};

export default Start;
