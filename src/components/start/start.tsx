import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getGameState } from '../../store/game-state-process/selectors';
import { setGameState } from '../../store/game-state-process/game-state-process';
import { GameStates } from '../../const';

type StartPropsType = {
  onSetWarningText: Dispatch<SetStateAction<string | string[]>>,
  onSetApprovedAction: Dispatch<SetStateAction<() => void>>,
};

const Start = (props: StartPropsType) => {
  const { t } = useTranslation();
  const { onSetWarningText, onSetApprovedAction } = props;
  const dispatch = useAppDispatch();
  const gameState = useAppSelector(getGameState);

  const isShouldShowWarning = gameState === GameStates.SettingFleet || gameState === GameStates.Started;

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

  const showWarning = (text: string | string[], approvedAction: Dispatch<SetStateAction<() => void>>) => {
    onSetWarningText(text);
    onSetApprovedAction(() => approvedAction);
  };
  
  const handleClick = () => {
    if (gameState === GameStates.SettingFleet) {
      showWarning('Are you sure that the fleet arranged?', () => dispatch(setGameState(GameStates.Started)));
    } else if(gameState === GameStates.Started) {
      showWarning([t('alert.restart'), t('alert.areYouSureToContinue')], () => dispatch(setGameState(GameStates.SettingFleet)));
    } else {
      dispatch(setGameState(GameStates.SettingFleet));
    }
  };

  const buttonLabel = getButtonLabel();

  return (
    <button
      type="button"
      className="btn btn-light nav-btn"
      data-bs-toggle={isShouldShowWarning ? 'modal' : ''}
      data-bs-target="#warningModal"
      data-testid="startComponent"
      onClick={handleClick}
    >
      {buttonLabel}
    </button>
  );
};

export default Start;
