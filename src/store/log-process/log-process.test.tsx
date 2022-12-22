import logProcess, { setLog, addNewRecord } from './log-process';
import { setGameOptions } from '../game-options-process/game-options-process';
import { setGameState } from '../game-state-process/game-state-process';
import { fieldTypes, GameState, ShootResult } from '../../const';
import { LogRecord, Record } from '../../types';

const initialState: LogRecord[] = [];

const state1: LogRecord[] = [
  [3, 2, {x: 1, y: 1}, ShootResult.OffTarget],
  [2, 1, {x: 2, y: 1}, ShootResult.OffTarget],
  [1, 1, {x: 2, y: 2}, ShootResult.Wounded],
];

describe('Reducer: logProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(logProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialState);
  });

  it('should set reversed data with ids', () => {
    const data: Record[] = [
      [1, {x: 2, y: 2}, ShootResult.Wounded],
      [1, {x: 2, y: 1}, ShootResult.OffTarget],
      [2, {x: 1, y: 1}, ShootResult.OffTarget],
    ];
    const expectedLog = state1;

    expect(logProcess.reducer(initialState, setLog(data))).toEqual(expectedLog);
  });

  it('should add a new record to the beginning of the log', () => {
    const newRecord: Record = [1, {x: 5, y: 5}, ShootResult.Killed];
    const expectedLog = [[4, ...newRecord], ...state1];

    expect(logProcess.reducer(state1, addNewRecord(newRecord))).toEqual(expectedLog);
  });

  it('should clear log if change game options', () => {
    const currentState = state1;
    expect(logProcess.reducer(currentState, setGameOptions({fieldType: fieldTypes[0]}))).toEqual(initialState);
  });

  it('should clear log if the game state was set to "setting fleet"', () => {
    const currentState = state1;
    expect(logProcess.reducer(currentState, setGameState(GameState.SettingFleet))).toEqual(initialState);
  });

  const gameStatesForTest = [GameState.NotStarted, GameState.Started, GameState.Finished];
  it.each(gameStatesForTest)('should not clear log if the game state was set setted not to "setting fleet" %s', (gameState) => {
    const currentState = state1;
    expect(logProcess.reducer(currentState, setGameState(gameState))).toEqual(state1);
  });
});
