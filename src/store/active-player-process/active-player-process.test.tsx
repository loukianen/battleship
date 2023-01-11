import activePlayerProcess, { setActivePlayer} from './active-player-process';
import { initialGameOptionsState, setGameOptions } from '../game-options-process/game-options-process';
import { setGameState } from '../game-state-process/game-state-process';
import { setLog, addNewRecord } from '../log-process/log-process';
import { GameState, ShootResult } from '../../const';
import { PlayerIndex, Record } from '../../types';

const initialState = 'undefined';

describe('Reducer: activePlayerProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(activePlayerProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toBe(initialState);
  });

  it('should update activePlayer by set data', () => {
    expect(activePlayerProcess.reducer(initialState, setActivePlayer(1))).toBe(1);
  });

  it('should set "undefined" active player if game options had changed', () => {
    expect(activePlayerProcess.reducer(0, setGameOptions(initialGameOptionsState))).toBe('undefined');
  });

  it('should set "undefined" active player if game state "setting fleet"', () => {
    expect(activePlayerProcess.reducer(0, setGameState(GameState.NotStarted))).toBe(0);
    expect(activePlayerProcess.reducer(0, setGameState(GameState.Battle))).toBe(0);
    expect(activePlayerProcess.reducer(0, setGameState(GameState.SettingFleet))).toBe('undefined');
    expect(activePlayerProcess.reducer(0, setGameState(GameState.Finished))).toBe(0);
  });

  const records: Record[] = [
    [1, null, ShootResult.Started],
    [1, {x: 1, y: 1}, ShootResult.OffTarget],
    [0, {x: 2, y: 2}, ShootResult.Wounded],
    [0, {x: 2, y: 2}, ShootResult.Killed],
    [0, null, ShootResult.Won],
  ];

  it('should set active player by "setLog" action', () => {
    expect(activePlayerProcess.reducer(initialState, setLog(records))).toBe(0);
  });

  const rightActivePlayers: PlayerIndex[] = [1, 0, 0, 0, 0];
  const testData: [Record, PlayerIndex][] = records.map((record, index) => [record, rightActivePlayers[index]]);

  it.each(testData)('should set active player by "addNewRecord" action, %s', (record, answer) => {
    expect(activePlayerProcess.reducer(initialState, addNewRecord(record))).toBe(answer);
  });
});
