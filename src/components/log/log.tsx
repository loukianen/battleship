import './log.sass';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/hooks';
import { getLog } from '../../store/log-process/selectors';
import { getPlayers } from '../../store/game-options-process/selectors';
import { getPlayerNameForRender, letters } from '../../services/utils';
import { LocalisedPlayerName, ShootResult } from '../../const';
import { Coords, PlayerIndex } from '../../types';
import { FieldTextKey } from '../../locales/types';

const Log = () => {
  const { t, i18n } = useTranslation();
  const records = useAppSelector(getLog);
  const players = useAppSelector(getPlayers);

  const renderTHeader = () => (
    <thead>
      <tr>
        <td className="color-ship-border">{t('log.n')}</td>
        <td className="color-ship-border">{t('log.player')}</td>
        <td className="color-ship-border">{t('log.shoot')}</td>
        <td className="color-ship-border">{t('log.result')}</td>
      </tr>
    </thead>
  );

  const renderTBody = (data: [number, PlayerIndex, Coords | null, ShootResult][]) => data.map(([id, player, coords, result]) => {
    const playerName = getPlayerNameForRender(players, player, i18n, LocalisedPlayerName.Short);
    let coordsValue = null;
    if (coords !== null) {
      const { x, y } = coords;
      const letterFromX = letters[x - 1] as FieldTextKey;
      coordsValue = `${t(`field.${letterFromX}`)}${y}`;
    }
    const resultValue = t(`log.${result}`);
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{playerName}</td>
        <td>{coordsValue}</td>
        <td>{resultValue}</td>
      </tr>
    );
  });

  return (
    <div className="d-flex flex-column log_shipsfield text-center rounded" data-testid="log">
      <table className="table-sm table-borderless color-ship-border border-top border-info">
        {renderTHeader()}
        <tbody>
          {renderTBody(records)}
        </tbody>
      </table>
    </div>
  );
};

export default Log;
