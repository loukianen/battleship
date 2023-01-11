import { NameSpace } from '../../const';
import { State } from '../../types';

export const getActivePlayer = (state: State) => (state[NameSpace.ActivePlayer]);
