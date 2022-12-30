import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialGameOptionsState, setGameOptions } from '../game-options-process/game-options-process';
import { takeShipOutOfDock } from '../ship-in-move-process/ship-in-move-process';
import { createUserFleet, generateShipsList } from '../../services/utils';
import { ShipInterface, UserFleet } from '../../types';
import { NameSpace, ShipClass } from '../../const';

const { fieldType, shipType } = initialGameOptionsState;
const shipList = generateShipsList(fieldType);
export const initialDockState: UserFleet = createUserFleet(shipList, shipType);

const dockProcess = createSlice({
  name: NameSpace.Dock,
  initialState: initialDockState,
  reducers: {
    fillDock: (state, action: PayloadAction<UserFleet>) => action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(setGameOptions, (state, action) => {
      const { fieldType, shipType } = action.payload;
      const shipList = generateShipsList(fieldType);
      return createUserFleet(shipList, shipType);
    });
    builder.addCase(takeShipOutOfDock, (state, action) => {
      const ship = action.payload;
      const shipClass = ship.class as ShipClass;
      state[shipClass] = state[shipClass].filter((item: ShipInterface) => item.id !== ship.id);
      return state;
    });
  },
});

export const { fillDock } = dockProcess.actions;

export default dockProcess;
