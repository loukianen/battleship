import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, NameSpace } from '../../const';
import { setGameOptions } from '../game-options-process/game-options-process';

const gameStateProcess = createSlice({
  name: NameSpace.GameState,
  initialState: GameState.NotStarted,
  reducers: {
    setGameState: (state, action: PayloadAction<GameState>) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setGameOptions, () => GameState.NotStarted);
  },
});

export const { setGameState } = gameStateProcess.actions;

export default gameStateProcess;
