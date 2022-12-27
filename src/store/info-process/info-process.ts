import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameState } from '../game-state-process/game-state-process';
import { GameState, NameSpace } from '../../const';
import { InfoState, InfoStatePayload } from '../../types';

export const initialInfoState : InfoState = { message: 'makeSetting', player: null};

const infoProcess = createSlice({
  name: NameSpace.Billboard,
  initialState: initialInfoState,
  reducers: {
    setInfo: (state, action: PayloadAction<InfoStatePayload>) => {
      const { message, player } = action.payload;
      state.message = message;
      state.player = player ? player : null;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setGameState, (state, action) => {
      const gameState = action.payload;
      if (gameState === GameState.NotStarted) {
        state = initialInfoState;
      }
      if (gameState === GameState.Started) {
        state = {message: 'setFleet', player: null };
      }
      return state;
    });
  },
});

export const { setInfo } = infoProcess.actions;

export default infoProcess;
