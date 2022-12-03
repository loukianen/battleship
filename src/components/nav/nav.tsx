import { useState } from 'react';
import Start from '../start/start'
import Options from '../options/options';
import Language from '../language/language';
import WarningModal, { defaultWarningModalProps, WarningModalType } from '../warning-modal/warning-modal';
import './nav.sass';

const Nav = () => {
  const [warningModalState, setWarningModalState] = useState(defaultWarningModalProps as WarningModalType);

  return(
    <div className="d-flex flex-column-reverse flex-md-row p-2 justify-content-end" role="toolbar" aria-label="Main menu">
      <WarningModal { ...warningModalState } />
      <Start onShowWarning={setWarningModalState} />
      <Options />
      <Language />
    </div>
  );
};

export default Nav;