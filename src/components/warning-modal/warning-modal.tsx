import './warning-modal.sass';
import { uniqueId } from "../../services/utils";
import { useTranslation } from "react-i18next";

type WarningModalType = { dispatch: () => void , text: string | string[] };

const WarningModal = (props: WarningModalType) => {
  const { dispatch, text } = props;
  const { t } = useTranslation();

  const textRenderData = typeof text === 'string' ? [text] : text;

  const handleClick = () => {
    dispatch();
  };

  return (
    <div className="modal" id="warningModal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('alert.warning')}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-center">
            {textRenderData.map((item) => <p key={uniqueId()} className="main-warning-text">{item}</p>)}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('alert.cancel')}</button>
            <button type="button" className="btn btn-main-color" data-bs-dismiss="modal" onClick={handleClick}>{t('alert.continue')}</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default WarningModal;
