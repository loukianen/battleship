import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialGameOptionsState, setGameOptions } from '../game-options-process/game-options-process';
import { takeShipOutOfDock } from '../ship-in-move-process/ship-in-move-process';
import { makeFleet } from '../../services/utils';
import {ShipInterface, UserFleet } from '../../types';
import { NameSpace, ShipClass, } from '../../const';
import Ship from '../../ships/ship/ship';

const { fieldType, shipType } = initialGameOptionsState;
export const initialDockState: UserFleet = makeFleet(fieldType, shipType);

const dockProcess = createSlice({
  name: NameSpace.Dock,
  initialState: initialDockState,
  reducers: {
    fillDock: (state, action: PayloadAction<UserFleet>) => action.payload,
    returnShipIntoDock: (state, action: PayloadAction<Ship>) => {
      const ship = action.payload;
      if (ship.class) {
        state[ship.class].push(ship);
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setGameOptions, (state, action) => {
      const { fieldType, shipType } = action.payload;
      return makeFleet(fieldType, shipType);
    });

    builder.addCase(takeShipOutOfDock, (state, action) => {
      const ship = action.payload;
      const shipClass = ship.class as ShipClass;
      state[shipClass] = state[shipClass].filter((item: ShipInterface) => item.id !== ship.id);
      return state;
    });
  },
});

export const { fillDock, returnShipIntoDock } = dockProcess.actions;

export default dockProcess;
