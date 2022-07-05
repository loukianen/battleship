import Battlefield from '../battlefield/battlefield';
import Auxiliaryfield from '../auxiliary-field/auxiliary-field';

const Fields = () => (
  <main className="mt-3" data-testid="fields">
    <div className="d-flex flex-column flex-md-row text-center align-items-center align-items-md-end">
      <Battlefield owner="enemy" />
      <Auxiliaryfield />
      <Battlefield owner="user" />
    </div>
  </main>
);

export default Fields;
