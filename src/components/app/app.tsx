import Header from '../header/header';
import Fields from '../fields/fields';
import Footer from '../footer/footer';
import './app.sass';

const App = () => (
  <div className="container d-flex flex-column justify-content-between min-vh-100 mt-3">
    <Header />
    <Fields />
    <Footer />
  </div>
);

export default App;
