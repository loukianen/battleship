import { NameSpace } from '../../const';
import { State } from '../../types';

export const getShipInMove = (state: State) => (state[NameSpace.ShipInMove]);
