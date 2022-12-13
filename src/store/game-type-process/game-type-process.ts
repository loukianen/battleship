import isEmpty from 'lodash-ts/isEmpty';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAvailablePlayers } from '../available-players-process/available-players-process';
import { setGameOptions } from '../game-options-process/game-options-process';
import { GameTypes, NameSpace, PlayerTypes } from '../../const';

const gameTypeProcess = createSlice({
  name: NameSpace.GameType,
  initialState: GameTypes.WithAI,
  reducers: {
    setGameType: (state, action: PayloadAction<GameTypes>) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAvailablePlayers, (state, action) => {
      const { user } = action.payload;
      if (!isEmpty(user.id)) {
        state = GameTypes.WithAI;
      } else {
        state = GameTypes.Auto;
      }
      return state;
    });
    builder.addCase(setGameOptions, (state, action) => {
      const { players } = action.payload;
      if (players && players[0]) {
        state = players[0].type === PlayerTypes.Human ? GameTypes.WithAI : GameTypes.Auto;
      }
      return state;
    });
  },
});

export const { setGameType } = gameTypeProcess.actions;

export default gameTypeProcess;
