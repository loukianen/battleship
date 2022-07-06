import { useTranslation } from 'react-i18next';

const Start = () => {
  const { t } = useTranslation();
  return (
    <button type="button" className="btn btn-light nav-btn">{t('ui.navStart')}</button>
  );
};

export default Start;
