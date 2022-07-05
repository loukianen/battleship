import availablePlayers from './available-players-process/available-players-process';
import {combineReducers} from 'redux';
import { NameSpace } from '../const';

const reducer = combineReducers({
  [NameSpace.AvailablePlayers]: availablePlayers.reducer,
});

export default reducer;
