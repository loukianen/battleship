import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AlertKey } from '../../locales/types';

type WarningModalType = { dispatch?: () => void };

const WarningModal = (props: WarningModalType) => {
  const { dispatch } = props;
  const { t } = useTranslation();

  const handleClick = () => {
    if (dispatch) {
      dispatch();
    }
  };

  const modalListener = (event: Event) => {
    const mainTextElement = document.querySelector('.main-warning-text') as HTMLElement;
    const button = event.target as HTMLElement;
    const buttonData = button.getAttribute('data-bs-whatever') as AlertKey;
    mainTextElement.textContent = t(`alert.${buttonData}`);
  }

  useEffect(() => {
    const modal = document.getElementById('warningModal') as HTMLElement;
    modal.addEventListener('show.bs.modal', modalListener);
    return () => modal.removeEventListener('show.bs.modal', modalListener);
  });

  return (
    <div className="modal" id="warningModal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p className="main-warning-text"></p>
            <p>{t('alert.areYouSureToContinue')}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('alert.cancel')}</button>
            <button type="button" className="btn btn-primary" onClick={handleClick}>{t('alert.continue')}</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default WarningModal;
