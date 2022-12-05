import { useTranslation } from 'react-i18next';
import Battlefield from '../battlefield/battlefield';
import Auxiliaryfield from '../auxiliary-field/auxiliary-field';
import { useAppSelector } from '../../hooks/hooks';
import { getPlayers } from '../../store/game-options-process/selectors';
import { getLocalizedUsername } from '../../services/utils';

const Fields = () => {
  const [player1, player2] = useAppSelector(getPlayers);
  const { i18n } = useTranslation();

  return (
    <main className="mt-3" data-testid="fields">
      <div className="d-flex flex-column flex-md-row text-center align-items-center align-items-md-end">
        <Battlefield owner={getLocalizedUsername(player1, i18n)} />
        <Auxiliaryfield />
        <Battlefield owner={getLocalizedUsername(player2, i18n)} />
      </div>
    </main>
  );
};

export default Fields;
