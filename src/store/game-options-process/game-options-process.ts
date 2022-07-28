import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
});

export const { setGameOptions } = availablePlayersProcess.actions;

export default availablePlayersProcess;
