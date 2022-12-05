import Battlefield from '../battlefield/battlefield';
import Auxiliaryfield from '../auxiliary-field/auxiliary-field';
import { useAppSelector } from '../../hooks/hooks';
import { getPlayers } from '../../store/game-options-process/selectors';

const Fields = () => {
  const [player1, player2] = useAppSelector(getPlayers);
  const arePlayersTheSame = player1.id === player2.id;

  return (
    <main className="mt-3" data-testid="fields">
      <div className="d-flex flex-column flex-md-row text-center align-items-center align-items-md-end">
        <Battlefield owner={player1} mark={arePlayersTheSame ? 'I' : ''} />
        <Auxiliaryfield />
        <Battlefield owner={player2} mark={arePlayersTheSame ? 'II' : ''}/>
      </div>
    </main>
  );
};

export default Fields;
