import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayersDataType } from '../../types';
import { NameSpace } from '../../const';

const availablePlayersProcess = createSlice({
  name: NameSpace.AvailablePlayers,
  initialState: { user:{}, robots:[] } as PlayersDataType,
  reducers: {
    setAvailablePlayers: (state, action: PayloadAction<PlayersDataType>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setAvailablePlayers } = availablePlayersProcess.actions;

export default availablePlayersProcess;
