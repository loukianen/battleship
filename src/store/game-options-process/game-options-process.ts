import isEmpty from 'lodash-ts/isEmpty';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAvailablePlayers } from '../available-players-process/available-players-process';
import { OptionsDataType, OptionsPayloadDataType } from '../../types';
import { NameSpace } from '../../const';

export const initialGameOptionsState: OptionsDataType = {
  players: [{id: 'unknown', name: 'unknown'}, {id: 'unknown', name: 'unknown'}],
  fieldType: '10',
  shipType: 'line'
};

const availablePlayersProcess = createSlice({
  name: NameSpace.GameOptions,
  initialState: initialGameOptionsState,
  reducers: {
    setGameOptions: (state, action: PayloadAction<OptionsPayloadDataType>) => ({ ...state, ...action.payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(setAvailablePlayers, (state, action) => {
      const { user, robots } = action.payload;
      if (!isEmpty(user.id)) {
        state.players = [user, state.players[1]];
      }
      if (!isEmpty(robots)) {
        state.players = [state.players[0], robots[0]];
      }
    });
  },
});

export const { setGameOptions } = availablePlayersProcess.actions;

export default availablePlayersProcess;
