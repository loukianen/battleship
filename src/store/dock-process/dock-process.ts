import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialGameOptionsState, setGameOptions } from '../game-options-process/game-options-process';
import { createUserFleet, generateShipsList } from '../../services/utils';
import { UserFleet } from '../../types';
import { NameSpace } from '../../const';

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
  },
});

export const { fillDock } = dockProcess.actions;

export default dockProcess;
