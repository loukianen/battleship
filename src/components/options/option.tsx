import { useTranslation } from 'react-i18next';

const Options = () => {
  const { t } = useTranslation();
  return (
    <button type="button" className="btn btn-light nav-btn" data-testid="optionsComponent">{t('ui.navOptions')}</button>
  );
};

export default Options;
