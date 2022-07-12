import { NameSpace } from '../../const';
import { State } from '../../types';

export const getGameState = (state: State) => (state[NameSpace.GameState]);
