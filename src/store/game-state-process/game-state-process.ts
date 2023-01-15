import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, NameSpace, ShootResult } from '../../const';
import { addNewRecord } from '../log-process/log-process';
import { setGameOptions } from '../game-options-process/game-options-process';
import { Record } from '../../types';

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
    builder.addCase(addNewRecord, (state, action: PayloadAction<Record>) => {
      if (action.payload[2] === ShootResult.Won) {
        state = GameState.Finished;
      }
      return state;
    });
  },
});

export const { setGameState } = gameStateProcess.actions;

export default gameStateProcess;
