import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameStates, NameSpace } from '../../const';

const gameStateProcess = createSlice({
  name: NameSpace.GameState,
  initialState: GameStates.NotStarted,
  reducers: {
    setGameState: (state, action: PayloadAction<GameStates>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setGameState } = gameStateProcess.actions;

export default gameStateProcess;
