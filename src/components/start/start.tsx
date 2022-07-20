import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

type StartPropsType = {
  onSetWarningText: Dispatch<SetStateAction<string | string[]>>,
  onSetApprovedAction: Dispatch<SetStateAction<() => void>>,
};

const Start = (props: StartPropsType) => {
  const { t } = useTranslation();
  const { onSetWarningText, onSetApprovedAction } = props;

  const handleClick = () => {
    onSetWarningText([t('alert.restart'), t('alert.areYouSureToContinue')]);
    onSetApprovedAction(() => () => {
      console.log('Restart game');
    });
  };

  return (
    <button type="button" className="btn btn-light nav-btn" data-bs-toggle="modal" data-bs-target="#warningModal" data-testid="startComponent" onClick={handleClick}>{t('ui.navStart')}</button>
  );
};

export default Start;
