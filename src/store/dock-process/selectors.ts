import { NameSpace } from '../../const';
import { State } from '../../types';

export const getDock = (state: State) => state[NameSpace.Dock];
