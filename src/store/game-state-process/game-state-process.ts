import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, NameSpace } from '../../const';

const gameStateProcess = createSlice({
  name: NameSpace.GameState,
  initialState: GameState.NotStarted,
  reducers: {
    setGameState: (state, action: PayloadAction<GameState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setGameState } = gameStateProcess.actions;

export default gameStateProcess;
