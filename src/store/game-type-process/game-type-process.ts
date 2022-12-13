import isEmpty from 'lodash-ts/isEmpty';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAvailablePlayers } from '../available-players-process/available-players-process';
import { setGameOptions } from '../game-options-process/game-options-process';
import { GameType, NameSpace, PlayerType } from '../../const';

const gameTypeProcess = createSlice({
  name: NameSpace.GameType,
  initialState: GameType.WithAI,
  reducers: {
    setGameType: (state, action: PayloadAction<GameType>) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAvailablePlayers, (state, action) => {
      const { user } = action.payload;
      if (!isEmpty(user.id)) {
        state = GameType.WithAI;
      } else {
        state = GameType.Auto;
      }
      return state;
    });
    builder.addCase(setGameOptions, (state, action) => {
      const { players } = action.payload;
      if (players && players[0]) {
        state = players[0].type === PlayerType.Human ? GameType.WithAI : GameType.Auto;
      }
      return state;
    });
  },
});

export const { setGameType } = gameTypeProcess.actions;

export default gameTypeProcess;
