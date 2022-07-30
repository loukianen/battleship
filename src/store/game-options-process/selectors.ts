import { NameSpace } from '../../const';
import { State } from '../../types';

export const getPlayers = (state: State) => (state[NameSpace.GameOptions].players);

export const getFieldType = (state: State) => (state[NameSpace.GameOptions].fieldType);

export const getShipType = (state: State) => (state[NameSpace.GameOptions].shipType);
