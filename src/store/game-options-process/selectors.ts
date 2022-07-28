import { NameSpace } from '../../const';
import { State } from '../../types';

export const getFirstPlayer = (state: State) => (state[NameSpace.GameOptions].players[0]);
export const getSecondPlayer = (state: State) => (state[NameSpace.GameOptions].players[1]);

export const getFieldType = (state: State) => (state[NameSpace.GameOptions].fieldType);

export const getShipType = (state: State) => (state[NameSpace.GameOptions].shipType);
