import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialGameOptionsState } from '../game-options-process/game-options-process';
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
  // extraReducers: (builder) => {
  //   builder.addCase(setAvailablePlayers, (state, action) => {
  //     const { user, robots } = action.payload;
  //     if (!isEmpty(user.id)) {
  //       state.players = [user, state.players[1]];
  //     }
  //     if (!isEmpty(robots)) {
  //       state.players = [state.players[0], robots[0]];
  //     }
  //     return state;
  //   });
  // },
});

export const { fillDock } = dockProcess.actions;

export default dockProcess;
