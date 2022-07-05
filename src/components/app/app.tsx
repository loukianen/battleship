import Header from '../header/header';
import Fields from '../fields/fields';
import Footer from '../footer/footer';
import './app.sass';
import { useAppDispatch } from '../../hooks/hooks';
import { useLayoutEffect } from 'react';
import { setAvailablePlayers } from '../../store/available-players-process/available-players-process';
import connector from '../../services/connector-UI-game'; 

const App = () => {

  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    const players = connector.getPlayers();
    dispatch(setAvailablePlayers(players));
  }, [dispatch]);

  return (
    <div className="container d-flex flex-column justify-content-between min-vh-100 mt-3">
      <Header />
      <Fields />
      <Footer />
    </div>
  );
 };

export default App;
