import { useAppSelector } from '../../hooks/hooks';
import { getGameState } from '../../store/game-state-process/selectors';
import Dock from '../dock/dock';
import Info from '../info/info';
import Log from '../log/log';
import { GameState } from '../../const';

const Auxiliaryfield = () => {
  const gameState = useAppSelector(getGameState);

  return(
    <div id="centerField" className="d-flex flex-column ms-2 me-2 mb-2">
      <Info />
      {gameState === GameState.Battle || gameState === GameState.Finished ? <Log /> : <Dock />}
    </div>
  );
};

export default Auxiliaryfield;
