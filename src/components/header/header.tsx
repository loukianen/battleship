import { useTranslation } from 'react-i18next';
import Nav from "../nav/nav";
import './header.sass';

const Header = () => {
  const { t } =  useTranslation();
  return (
    <header className="d-flex flex-column flex-md-row w-100" data-testid="header">
      <img className="rounded" id="logo" src="img/logo_356_x_200.jpg" alt={t('ui.altLogo')} />
      <div className="d-flex flex-column align-content-end justify-content-around w-100">
        <div className="header-main text-center display-2" id="mainHeader">{t('ui.mainHeader')}</div>
        <Nav />
      </div>
     
    </header>
  );
};

export default Header;
