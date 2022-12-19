import { NameSpace } from '../../const';
import { State } from '../../types';

export const getField1 = (state: State) => (state[NameSpace.Fields].field1);

export const getField2 = (state: State) => (state[NameSpace.Fields].field2);
