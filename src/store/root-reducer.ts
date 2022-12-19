import availablePlayers from './available-players-process/available-players-process';
import fields from './fields-process/fields-process';
import gameOptions from './game-options-process/game-options-process';
import gameState from './game-state-process/game-state-process';
import gameType from './game-type-process/game-type-process';
import {combineReducers} from 'redux';
import { NameSpace } from '../const';

const reducer = combineReducers({
  [NameSpace.AvailablePlayers]: availablePlayers.reducer,
  [NameSpace.Fields]: fields.reducer,
  [NameSpace.GameOptions]: gameOptions.reducer,
  [NameSpace.GameState]: gameState.reducer,
  [NameSpace.GameType]: gameType.reducer,
});

export default reducer;
