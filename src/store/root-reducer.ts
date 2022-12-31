import availablePlayers from './available-players-process/available-players-process';
import dock from './dock-process/dock-process';
import fields from './fields-process/fields-process';
import fleet from './fleet-process/fleet-process';
import gameOptions from './game-options-process/game-options-process';
import gameState from './game-state-process/game-state-process';
import gameType from './game-type-process/game-type-process';
import info from './info-process/info-process';
import log from './log-process/log-process';
import shipInMove from './ship-in-move-process/ship-in-move-process';
import {combineReducers} from 'redux';
import { NameSpace } from '../const';

const reducer = combineReducers({
  [NameSpace.AvailablePlayers]: availablePlayers.reducer,
  [NameSpace.Dock]: dock.reducer,
  [NameSpace.Fields]: fields.reducer,
  [NameSpace.Fleet]: fleet.reducer,
  [NameSpace.GameOptions]: gameOptions.reducer,
  [NameSpace.GameState]: gameState.reducer,
  [NameSpace.GameType]: gameType.reducer,
  [NameSpace.Billboard]: info.reducer,
  [NameSpace.Log]: log.reducer,
  [NameSpace.ShipInMove]: shipInMove.reducer,
});

export default reducer;
