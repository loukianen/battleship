import './info.sass';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/hooks';
import { getGameType } from '../../store/game-type-process/selectors';
import { getInfo } from '../../store/info-process/selectors';
import { getPlayers } from '../../store/game-options-process/selectors';
import { getEnemy, getPlayerNameForRender } from '../../services/utils';
import { GameType, ShootResult } from '../../const';
import { Player, PlayerIndex } from '../../types';



const Info = () => {
  const { t, i18n } = useTranslation();
  const gameType = useAppSelector(getGameType);
  const players = useAppSelector(getPlayers);
  const { message, player } = useAppSelector(getInfo);

  const getTextForAuto = (message: ShootResult, players: Player[], activePlayer: PlayerIndex) => {
    const activePlayerName = getPlayerNameForRender(players, activePlayer, i18n);
    const anotherPlayerName = getPlayerNameForRender(players, getEnemy(activePlayer), i18n);

    const mainPhrase = `${activePlayerName}${t(`info.${message}.${GameType.Auto}`)}`;
    let tailPhrase = '';

    if (message === ShootResult.Wounded || message === ShootResult.Killed) {
      tailPhrase = ` ${activePlayerName}${t(`info.${ShootResult.Started}.${GameType.Auto}`)}`;
    }
    if (message === ShootResult.OffTarget) {
      tailPhrase = ` ${anotherPlayerName}${t(`info.${ShootResult.Started}.${GameType.Auto}`)}`;
    }

    return `${mainPhrase}${tailPhrase}`;
  };

  const getTextForUser = (message: ShootResult, players: Player[], activePlayer: PlayerIndex) => {
    const activePlayerName = getPlayerNameForRender(players, activePlayer, i18n);
    const anotherPlayerName = getPlayerNameForRender(players, getEnemy(activePlayer), i18n);

    let mainPhrase = '';
    let tailPhrase = '';

    if (activePlayer === 0) {
      mainPhrase = t(`info.${message}.${GameType.WithAI}`);

      if (message === ShootResult.Wounded || message === ShootResult.Killed) {
        tailPhrase = ` ${t(`info.${ShootResult.Started}.${GameType.WithAI}`)}`;
      }
      if (message === ShootResult.OffTarget) {
        tailPhrase = ` ${anotherPlayerName}${t(`info.${ShootResult.Started}.${GameType.Auto}`)}`;
      }

    } else {
      if (message === ShootResult.OffTarget) {
        mainPhrase = `${activePlayerName}${t(`info.${message}.${GameType.Auto}`)}`;
        tailPhrase = ` ${t(`info.${ShootResult.Started}.${GameType.WithAI}`)}`;
      } else {
        return getTextForAuto(message, players, activePlayer);
      }
    }

    return `${mainPhrase}${tailPhrase}`;;
  };

  const getText = (message: ShootResult, players: Player[], player: PlayerIndex, type: GameType) => {
    const mapping = {
      [GameType.Auto]: getTextForAuto,
      [GameType.WithAI]: getTextForUser,
    };
    return mapping[type](message, players, player);
  }

  let text;
  if (player === null) {
    text = t(`info.${message}`);
  } else {
    const messageAsShootresult = message as ShootResult;
    text = getText(messageAsShootresult, players, player, gameType);
  }

  return (
    <div className="info_messagefield d-flex justify-content-center rounded" data-testid="info">
      <div className="p-1 align-self-center">{text}</div>
    </div>
  );
};

export default Info;
