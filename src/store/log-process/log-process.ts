import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameOptions } from '../game-options-process/game-options-process';
import { setGameState } from '../game-state-process/game-state-process';
import { GameState, NameSpace } from '../../const';
import { LogRecord, Record } from '../../types';

const logProcess = createSlice({
  name: NameSpace.Log,
  initialState: [] as LogRecord[],
  reducers: {
    setLog: (state, action: PayloadAction<Record[]>) => {
      const recordsWithId: LogRecord[] = action.payload.map((record, index) => [index + 1, ...record])
      state = recordsWithId.reverse();
      return state;
    },
    addNewRecord: (state, action: PayloadAction<Record>) => {
      const lastId = state[0] ? state[0][0] : 0;
      state = [[lastId + 1, ...action.payload], ...state];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setGameState, (state, action) => {
      const gameState = action.payload;
      if (gameState === GameState.NotStarted) {
        state = [];
      }
      return state;
    });
    builder.addCase(setGameOptions, () => {
      return [];
    });
  },
});

export const { setLog, addNewRecord } = logProcess.actions;

export default logProcess;
