import cloneDeep from 'lodash-ts/cloneDeep';
import dockProcess, { initialDockState, fillDock, returnShipIntoDock } from './dock-process';
import { initialGameOptionsState, setGameOptions } from '../game-options-process/game-options-process';
import { replaceShipsToInfo } from '../../services/utils';
import { UserFleet } from '../../types';
import { fieldTypes, ShipClass, ShipShape } from '../../const';
import { takeShipOutOfDock } from '../ship-in-move-process/ship-in-move-process';

describe('Reducer: dockProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(dockProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialDockState);
  });

  it('should set new state', () => {
    const newState: UserFleet = cloneDeep(initialDockState);
    newState.fourDeck = [];
    expect(dockProcess.reducer(initialDockState, fillDock(newState))).toEqual(newState);
  });

  describe('should change fleet in dock if had changed field type or ship type in game option', () => {
    it('players', () => {
      const players = [initialGameOptionsState.players[1], initialGameOptionsState.players[0]];
      const newState = dockProcess.reducer(initialDockState, setGameOptions({...initialGameOptionsState, players}));

      expect(replaceShipsToInfo(newState)).toEqual(replaceShipsToInfo(initialDockState));
    });

    it('shipType', () => {
      const shipType = ShipShape.Any;
      const newState = dockProcess.reducer(initialDockState, setGameOptions({...initialGameOptionsState, shipType}));

      expect(replaceShipsToInfo(newState)).toEqual(replaceShipsToInfo(initialDockState));
    });

    it('fieldType', () => {
      const fieldType = fieldTypes[0];
      const newState = dockProcess.reducer(initialDockState, setGameOptions({...initialGameOptionsState, fieldType}));
      const expectedInfo = {
        [ShipClass.Four]: [],
        [ShipClass.Three]: [],
        [ShipClass.Double]: [],
        [ShipClass.One]: [{ shipClass: ShipClass.One, shipShape: ShipShape.Line }],
      };

      expect(replaceShipsToInfo(newState)).toEqual(expectedInfo);
    });
  });

  it('should remove took out of dock ship', () => {
    const tookOutShip = initialDockState[ShipClass.One][0];
    const expectedState = { ...initialDockState, [ShipClass.One]: initialDockState[ShipClass.One].slice(1) };

    expect(dockProcess.reducer(initialDockState, takeShipOutOfDock(tookOutShip))).toEqual(expectedState);
  });

  it('should add a ship in the dock case "returnShipIntoDock" action', () => {
    const returnedShip = initialDockState[ShipClass.Double][0];
    const expectedState = { ...initialDockState };
    expectedState[ShipClass.Double] = [...expectedState[ShipClass.Double], returnedShip];
    console.log(expectedState[ShipClass.Double]);

    expect(dockProcess.reducer(initialDockState, returnShipIntoDock(returnedShip))).toEqual(expectedState);
  });
});
