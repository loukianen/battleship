import { Dispatch, SetStateAction, useState } from 'react';
import Start from '../start/start'
import Options from '../options/options';
import Language from '../language/language';
import WarningModal from '../warning-modal/warning-modal';
import './nav.sass';

type WarningTextType = [string | string[], Dispatch<SetStateAction<string | string[]>>];

const Nav = () => {
  const defaultAction = () => () => {
    console.log('This is default dispatch');
  };
  const [warningText, setWarningText] = useState('') as WarningTextType;
  const [approvedDispatch, setApprovedDispatch] = useState(defaultAction);

  return(
    <div className="d-flex flex-column-reverse flex-md-row p-2 justify-content-end" role="toolbar" aria-label="Main menu">
      <WarningModal text={warningText} dispatch={approvedDispatch} />
      <Start onSetWarningText={setWarningText} onSetApprovedAction={setApprovedDispatch} />
      <Options />
      <Language />
    </div>
  );
};

export default Nav;
