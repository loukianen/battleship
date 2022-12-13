import { NameSpace } from '../../const';
import { State } from '../../types';

export const getGameType = (state: State) => (state[NameSpace.GameType]);
