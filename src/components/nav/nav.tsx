import Start from '../start/start'
import Options from '../options/option';
import Language from '../language/language';
import './nav.sass';

const Nav = () => {
  return(
    <div className="btn-group nav flex-column-reverse flex-md-row justify-content-end p-2" role="toolbar" aria-label="Main menu">
      <Start />
      <Options />
      <Language />
    </div>
  );
};

export default Nav;
