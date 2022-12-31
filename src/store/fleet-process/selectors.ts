import { NameSpace } from '../../const';
import { State } from '../../types';

export const getFleet = (state: State) => (state[NameSpace.Fleet]);
