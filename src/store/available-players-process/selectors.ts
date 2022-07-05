import { NameSpace } from '../../const';
import { State } from '../../types';

export const getUser = (state: State) => (state[NameSpace.AvailablePlayers].user);

export const getRobots = (state: State) => (state[NameSpace.AvailablePlayers].robots);
