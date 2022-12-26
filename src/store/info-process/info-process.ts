import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from '../game-state-process/game-state-process';
import { GameState, NameSpace } from '../../const';
import { InfoKey } from '../../locales/types';

const initialState = 'makeSetting' as InfoKey;

const infoProcess = createSlice({
  name: NameSpace.Billboard,
  initialState: initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<InfoKey>) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setGameState, (state, action) => {
      const gameState = action.payload;
      if (gameState === GameState.NotStarted) {
        state = initialState;
      }
      if (gameState === GameState.Started) {
        state = 'setFleet';
      }
      return state;
    });
  },
});

export const { setInfo } = infoProcess.actions;

export default infoProcess;
