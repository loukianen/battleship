import { NameSpace } from '../../const';
import { State } from '../../types';

export const getInfo = (state: State) => state[NameSpace.Billboard];
