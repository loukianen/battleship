import './warning-modal.sass';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { uniqueId } from "../../services/utils";
import { useTranslation } from "react-i18next";

export type WarningModalType = { dispatch: () => void, text: string | string[], show: boolean };

const WarningModal = (props: WarningModalType) => {
  const { dispatch, text } = props;
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(props.show);
  }, [dispatch, text]);
  
  const textRenderData = typeof text === 'string' ? [text] : text;

  const handleClose = () => setShow(false);

  const handleContinue= () => {
    setShow(false);
    dispatch();
  };

  return (
    <Modal className="modal" show={show} onHide={handleClose}>
      <Modal.Dialog >
        <Modal.Header closeButton>
          <Modal.Title>{t('alert.warning')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {textRenderData.map((item) => <p key={uniqueId()} className="main-warning-text">{item}</p>)}
        </Modal.Body>

        <Modal.Footer>
          <Button className="btn btn-secondary" onClick={handleClose}>{t('alert.cancel')}</Button>
          <Button className="btn btn-main-color" onClick={handleContinue}>{t('alert.continue')}</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
};

export const defaultWarningModalProps = { dispatch: () => {}, text: '', show: false };

export default WarningModal;
