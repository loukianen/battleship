import './info.sass';
import { useTranslation } from 'react-i18next';
import { InfoKey } from '../../locales/types';

const Info = () => {
  const { t } = useTranslation();
  const billboard: InfoKey = 'makeSetting';
  return (
    <div className="info_messagefield d-flex justify-content-center rounded" data-testid="info">
      <div className="p-1 align-self-center">{t(`info.${billboard}`)}</div>
    </div>
  );
};

export default Info;
