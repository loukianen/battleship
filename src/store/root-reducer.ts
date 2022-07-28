import availablePlayers from './available-players-process/available-players-process';
import gameOptions from './game-options-process/game-options-process';
import gameState from './game-state-process/game-state-process';
import {combineReducers} from 'redux';
import { NameSpace } from '../const';

const reducer = combineReducers({
  [NameSpace.AvailablePlayers]: availablePlayers.reducer,
  [NameSpace.GameOptions]: gameOptions.reducer,
  [NameSpace.GameState]: gameState.reducer,
});

export default reducer;
