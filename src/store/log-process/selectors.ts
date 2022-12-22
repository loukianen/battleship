import { NameSpace } from '../../const';
import { State } from '../../types';

export const getLog = (state: State) => (state[NameSpace.Log]);
