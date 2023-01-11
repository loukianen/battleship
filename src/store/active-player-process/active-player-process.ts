import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, NameSpace } from '../../const';
import { ActivePlayerState } from '../../types';
import { setGameOptions } from '../game-options-process/game-options-process';
import { setGameState } from '../game-state-process/game-state-process';

const activePlayerProcess = createSlice({
  name: NameSpace.ActivePlayer,
  initialState: 'undefined' as ActivePlayerState,
  reducers: {
    setActivePlayer: (state, action: PayloadAction<ActivePlayerState>) => action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(setGameOptions, () => 'undefined');
    builder.addCase(setGameState, (state, action: PayloadAction<GameState>) => {
      const gameState = action.payload;
      if (gameState === GameState.SettingFleet || gameState === GameState.Finished) {
        state = 'undefined';
      }
      return state;
    });
  },
});

export const { setActivePlayer } = activePlayerProcess.actions;

export default activePlayerProcess;
