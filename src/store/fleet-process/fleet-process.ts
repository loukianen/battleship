import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { moveShip } from '../ship-in-move-process/ship-in-move-process';
import { setGameOptions } from '../game-options-process/game-options-process';
import { setGameState } from '../game-state-process/game-state-process';
import { GameState, NameSpace } from '../../const';
import { ShipInterface } from '../../types';

type FleetState = { [p: number]: ShipInterface } ;
export const initialFleetState: FleetState = {};

const fleetProcess = createSlice({
  name: NameSpace.ShipInMove,
  initialState: initialFleetState,
  reducers: {
    placeShipOnBattlefield: (state, action: PayloadAction<ShipInterface>) => {
      const ship = action.payload;
      state[ship.id] = ship;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setGameOptions, () => initialFleetState);
    builder.addCase(setGameState, (state, action) => action.payload === GameState.SettingFleet ? {} : state);
    builder.addCase(moveShip, (state, action) => {
      const ship = action.payload;
      delete state[ship.id];
      return state;
    });
  },
});

export const { placeShipOnBattlefield } = fleetProcess.actions;

export default fleetProcess;
