import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setGameOptions } from '../game-options-process/game-options-process';
import { setGameState } from '../game-state-process/game-state-process';
import { GameState, NameSpace } from '../../const';
import { ShipInterface } from '../../types';

type ShipInMoveState = ShipInterface | null;
export const initialShipInMoveState: ShipInMoveState = null;

const shipInMoveProcess = createSlice({
  name: NameSpace.ShipInMove,
  initialState: initialShipInMoveState as ShipInMoveState,
  reducers: {
    takeShipOutOfDock: (state, action: PayloadAction<ShipInterface>) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setGameOptions, () => null);
    builder.addCase(setGameState, (state, action) => action.payload === GameState.SettingFleet ? null : state);
  },
});

export const { takeShipOutOfDock } = shipInMoveProcess.actions;

export default shipInMoveProcess;
