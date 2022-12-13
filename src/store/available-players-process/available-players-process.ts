import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {PlayersDataType } from '../../types';
import { NameSpace, PlayerTypes } from '../../const';

export const initialAvailablePlayersState: PlayersDataType = { user: { id: '', name: '', type: PlayerTypes.Human }, robots:[] };

const availablePlayersProcess = createSlice({
  name: NameSpace.AvailablePlayers,
  initialState: initialAvailablePlayersState,
  reducers: {
    setAvailablePlayers: (state, action: PayloadAction<PlayersDataType>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setAvailablePlayers } = availablePlayersProcess.actions;

export default availablePlayersProcess;
