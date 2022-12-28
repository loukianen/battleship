import isEmpty from 'lodash-ts/isEmpty';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAvailablePlayers } from '../available-players-process/available-players-process';
import { OptionsDataType, OptionsPayloadDataType } from '../../types';
import { fieldTypes, NameSpace, PlayerType, ShipShape } from '../../const';

export const initialGameOptionsState: OptionsDataType = {
  players: [{id: 'unknown', name: 'unknown', type: PlayerType.Human}, {id: 'unknown', name: 'unknown', type: PlayerType.Robot}],
  fieldType: fieldTypes[3],
  shipType: ShipShape.Line,
};

const gameOptionsProcess = createSlice({
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
      return state;
    });
  },
});

export const { setGameOptions } = gameOptionsProcess.actions;

export default gameOptionsProcess;
