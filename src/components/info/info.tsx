import './info.sass';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/hooks';
import { getGameType } from '../../store/game-type-process/selectors';
import { getInfo } from '../../store/info-process/selectors';
import { getPlayers } from '../../store/game-options-process/selectors';
import { getLocalizedUsername } from '../../services/utils';
// import { InfoKey } from '../../locales/types';
import { GameType, ShootResult } from '../../const';
import { Player, PlayerIndex } from '../../types';

// const isMessageShootresultType = (text: InfoKey) => {
//   const shootResults: string[] = [ShootResult.Killed, ShootResult.OffTarget, ShootResult.Started, ShootResult.Won, ShootResult.Wounded];
//   return shootResults.includes(text);
// };

const Info = () => {
  const { t, i18n } = useTranslation();
  const gameType = useAppSelector(getGameType);
  const players = useAppSelector(getPlayers);
  const { message, player } = useAppSelector(getInfo);
  let text;

  const getTextToAuto = (message: ShootResult, players: Player[], activePlayer: PlayerIndex) => {
    const activePlayerName = getLocalizedUsername(players[activePlayer], i18n);
    const anotherPlayerName = getLocalizedUsername(players[activePlayer === 0 ? 1 : 0], i18n);

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
  
  const getTextToUser = (message: ShootResult, players: Player[], activePlayer: PlayerIndex) => {
    const anotherPlayerName = getLocalizedUsername(players[activePlayer === 0 ? 1 : 0], i18n);
    let result;

    if (activePlayer === 0) {
      const mainPhrase = t(`info.${message}.${GameType.WithAI}`);
      let tailPhrase = '';
      if (message === ShootResult.Wounded || message === ShootResult.Killed) {
        tailPhrase = t(`info.${ShootResult.Started}.${GameType.WithAI}`);
      }
      if (message === ShootResult.OffTarget) {
        tailPhrase = ` ${anotherPlayerName}${t(`info.${ShootResult.Started}.${GameType.Auto}`)}`;
      }
      result = `${mainPhrase}${tailPhrase}`;
    } else {
      if (message === ShootResult.OffTarget) {
        result = `${anotherPlayerName}${t(`info.${message}.${GameType.Auto}`)} ${t(`info.${ShootResult.Started}.${GameType.WithAI}`)}`;
      } else {
        result = getTextToAuto(message, players, activePlayer);
      }
    }
    return result;
  };

  if (player === null) {
    text = t(`info.${message}`);
  } else {
    const messageAsShootresult = message as ShootResult;
    if (gameType === GameType.Auto) {
      text = getTextToAuto(messageAsShootresult, players, player);
    }
    text = getTextToUser(messageAsShootresult, players, player);
  }

  // const billboard: InfoKey = 'makeSetting';
  return (
    <div className="info_messagefield d-flex justify-content-center rounded" data-testid="info">
      <div className="p-1 align-self-center">{text}</div>
    </div>
  );
};

export default Info;
