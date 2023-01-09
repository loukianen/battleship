import Battlefield from '../battlefield/battlefield';
import Auxiliaryfield from '../auxiliary-field/auxiliary-field';
import { useAppSelector } from '../../hooks/hooks';
import { getPlayers } from '../../store/game-options-process/selectors';
import { getGameType } from '../../store/game-type-process/selectors';
import { getField1, getField2 } from '../../store/fields-process/selectors';
import { BattlefieldType, GameType } from '../../const';


const Fields = () => {
  const [player1, player2] = useAppSelector(getPlayers);
  const field1 = useAppSelector(getField1);
  const field2 = useAppSelector(getField2);
  const gameType = useAppSelector(getGameType);
  const arePlayersTheSame = player1.id === player2.id;
  const player1FieldType = gameType === GameType.WithAI ? BattlefieldType.PlayerField : BattlefieldType.EnemyField;

  return (
    <main className="mt-3" data-testid="fields">
      <div className="d-flex flex-column flex-md-row text-center align-items-center align-items-md-end">
        <Battlefield owner={player1} fieldType={player1FieldType} mark={arePlayersTheSame ? 'I' : ''} field={field1} />
        <Auxiliaryfield />
        <Battlefield owner={player2} fieldType={BattlefieldType.EnemyField} mark={arePlayersTheSame ? 'II' : ''} field={field2}/>
      </div>
    </main>
  );
};

export default Fields;
