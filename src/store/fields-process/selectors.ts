import { FieldName, NameSpace } from '../../const';
import { State } from '../../types';

export const getField1 = (state: State) => (state[NameSpace.Fields][FieldName.First]);

export const getField2 = (state: State) => (state[NameSpace.Fields][FieldName.Second]);
