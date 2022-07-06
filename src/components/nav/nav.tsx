import Start from '../start/start'
import Options from '../options/option';
import Language from '../language/language';
import './nav.sass';

const Nav = () => {
  return(
    <div className="d-flex flex-column-reverse flex-md-row p-2 justify-content-end" role="toolbar" aria-label="Main menu">
      <Start />
      <Options />
      <Language />
    </div>
  );
};

export default Nav;
