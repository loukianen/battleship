import Battlefield from '../battlefield/battlefield';
import Auxiliaryfield from '../auxiliary-field/auxiliary-field';
import { useAppSelector } from '../../hooks/hooks';
import { getPlayers } from '../../store/game-options-process/selectors';
import { getGameType } from '../../store/game-type-process/selectors';
import { BattlefieldType, GameType } from '../../const';


const Fields = () => {
  const [player1, player2] = useAppSelector(getPlayers);
  const gameType = useAppSelector(getGameType);
  const arePlayersTheSame = player1.id === player2.id;
  const player1FieldType = gameType === GameType.WithAI ? BattlefieldType.PlayerField : BattlefieldType.EnemyField;

  return (
    <main className="mt-3" data-testid="fields">
      <h2>{gameType}</h2>
      <div className="d-flex flex-column flex-md-row text-center align-items-center align-items-md-end">
        <Battlefield owner={player1} type={player1FieldType} mark={arePlayersTheSame ? 'I' : ''} />
        <Auxiliaryfield />
        <Battlefield owner={player2} type={BattlefieldType.EnemyField} mark={arePlayersTheSame ? 'II' : ''}/>
      </div>
    </main>
  );
};

export default Fields;
