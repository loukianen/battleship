import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, NameSpace, ShootResult } from '../../const';
import { ActivePlayerState, PlayerIndex, Record } from '../../types';
import { setGameOptions } from '../game-options-process/game-options-process';
import { setGameState } from '../game-state-process/game-state-process';
import { setLog, addNewRecord } from '../log-process/log-process';

const getActivePlayer = (player: PlayerIndex, shootResult: ShootResult) => {
  const enemy = player === 0 ? 1 : 0;
  return shootResult === ShootResult.OffTarget ? enemy : player; 
}

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
      if (gameState === GameState.SettingFleet) {
        state = 'undefined';
      }
      return state;
    });
    builder.addCase(setLog, (state, action: PayloadAction<Record[]>) => {
      const [player, , shootResult] = action.payload[action.payload.length - 1];
      state = getActivePlayer(player, shootResult);
      return state;
    });
    builder.addCase(addNewRecord, (state, action: PayloadAction<Record>) => {
      const [player, , shootResult] = action.payload;
      state = getActivePlayer(player, shootResult);
      return state;
    });
  },
});

export const { setActivePlayer } = activePlayerProcess.actions;

export default activePlayerProcess;
