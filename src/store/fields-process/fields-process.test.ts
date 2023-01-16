import cloneDeep from 'lodash-ts/cloneDeep';
import DoubleDeckShip from '../../ships/double-deck-ship/double-deck-ship';
import fieldsProcess, { changeFields, initialFieldsState, markShipsAfterGame, setFields } from './fields-process';
import { addNewRecord, setLog } from '../log-process/log-process';
import { moveShip } from '../ship-in-move-process/ship-in-move-process';
import { placeShipOnBattlefield } from '../fleet-process/fleet-process';
import { setGameOptions } from '../game-options-process/game-options-process';
import { generateField } from '../../services/utils';
import { CellType, FieldName, fieldTypes, GameState, PlayerType, ShipShape, ShootResult } from '../../const';
import { Cell, Coords, FieldType, Record } from '../../types';
import { FieldTextKey } from '../../locales/types';
import getFieldData from '../../services/gen-field-data';
import { setGameState } from '../game-state-process/game-state-process';

describe('Reducer: fieldsProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(fieldsProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialFieldsState);
  });

  it('should set new state', () => {
    const copy = cloneDeep(initialFieldsState);
    const newState = {
      [FieldName.First]: copy[FieldName.First].slice(0, 3).map((row: Cell[]) => row.slice(0, 3)),
      [FieldName.Second]: copy[FieldName.Second].slice(0, 3).map((row: Cell[]) => row.slice(0, 3)),
    };

    expect(fieldsProcess.reducer(initialFieldsState, setFields(newState))).toEqual(newState);
  });

  describe('should correctly change fields', () => {
    it('with empty data should return inintial state', () => {
      const dataForChange = {};
      const newState = fieldsProcess.reducer(initialFieldsState, changeFields(dataForChange));

      expect(newState).toEqual(initialFieldsState);
    });

    it('should correctly work with 1 field and without value', () => {
      const firstCoords = {x: 2, y: 2};
      const secondCoords = {x: 3, y: 2};
      const dataForChange = {
        [FieldName.First]: [
          { coords: firstCoords, options: { type: CellType.Ship } },
          { coords: secondCoords, options: { type: CellType.AW } },
        ],
      };
      const newState = fieldsProcess.reducer(initialFieldsState, changeFields(dataForChange));

      expect(newState[FieldName.First][firstCoords.y][firstCoords.x].type).toBe(dataForChange[FieldName.First][0].options.type);
      expect(newState[FieldName.First][secondCoords.y][secondCoords.x].type).toBe(dataForChange[FieldName.First][1].options.type);
    });

    it('should correctly work with 2 field and with value', () => {
      const firstCoords = {x: 2, y: 2};
      const secondCoords = {x: 3, y: 2};
      const dataForChange = {
        [FieldName.First]: [
          { coords: firstCoords, options: { type: CellType.Ship } },
        ],
        [FieldName.Second]: [
          { coords: secondCoords, options: { type: CellType.Killed, value: 'x' as FieldTextKey } },
        ],
      };
      const newState = fieldsProcess.reducer(initialFieldsState, changeFields(dataForChange));

      expect(newState[FieldName.First][firstCoords.y][firstCoords.x].type).toBe(dataForChange[FieldName.First][0].options.type);
      expect(newState[FieldName.Second][secondCoords.y][secondCoords.x].type).toBe(dataForChange[FieldName.Second][0].options.type);
      expect(newState[FieldName.Second][secondCoords.y][secondCoords.x].value).toBe(dataForChange[FieldName.Second][0].options.value);
    });
  });

  it('should correctly mark ships', () => {
    const shipCoords = { x: 1, y: 2};
    const shipId = 2;
    const fieldSize = String(initialFieldsState[FieldName.First].length - 1) as FieldType;
    const fieldAfterGame = generateField(fieldSize);
    fieldAfterGame[shipCoords.y][shipCoords.x] = shipId;
    const markShipAfterGamePayload = { fieldName: FieldName.First, field: fieldAfterGame };

    const newState = fieldsProcess.reducer(initialFieldsState, markShipsAfterGame(markShipAfterGamePayload));
    const cellWithShip = newState[FieldName.First][shipCoords.y + 1][shipCoords.x + 1];

    expect(cellWithShip.shipId).toBe(shipId);
    expect(cellWithShip.type).toBe(CellType.Ship);
  });

  it('should shange field size if game options had been changed', () => {
    const newGameOptionsPayLoad = {
      players: [
        {id: 'newId', name: 'playerName', type: PlayerType.Robot},
        {id: 'unknown', name: 'unknown', type: PlayerType.Robot},
      ],
      fieldType: fieldTypes[0],
      shipType: ShipShape.Line,
    };;
    const newField = fieldsProcess.reducer(initialFieldsState, setGameOptions(newGameOptionsPayLoad));
    expect(newField.field1.length).toBe(Number(newGameOptionsPayLoad.fieldType) + 1);
    expect(newField.field2.length).toBe(Number(newGameOptionsPayLoad.fieldType) + 1);
  });

  describe('should correctly change field case "addNewRecord" action', () => {
    const shootCoords = { x: 2, y: 2 };
    const testData: [ShootResult, Coords | null, { cellType: CellType, value: string | null }][] = [
      [ShootResult.Killed, shootCoords, { cellType: CellType.Killed, value: 'x' }],
      [ShootResult.OffTarget, shootCoords, { cellType: CellType.I, value: 'point' }],
      [ShootResult.Started, null, { cellType: CellType.I, value: null }],
      [ShootResult.Won, null, { cellType: CellType.I, value: null }],
      [ShootResult.Wounded, shootCoords, { cellType: CellType.Killed, value: 'x' }],
    ];

    it.each(testData)('with result %s', (shootResult, coords, controlChanges) => {
      const { x, y } = shootCoords;
      const shoot1: Record = [0, coords, shootResult];
      const shoot2: Record = [1, coords, shootResult];

      const state1 = fieldsProcess.reducer(initialFieldsState, addNewRecord(shoot1));
      const cell1 = state1[FieldName.Second][y][x];
      expect(cell1.type).toBe(controlChanges.cellType);
      expect(cell1.value).toBe(controlChanges.value);

      const state2 = fieldsProcess.reducer(initialFieldsState, addNewRecord(shoot2));
      const cell2 = state2[FieldName.First][y][x];
      expect(cell2.type).toBe(controlChanges.cellType);
      expect(cell2.value).toBe(controlChanges.value);
    });
  });

  it('should process all records case "setLog" action', () => {
    const cell1 = { x: 2, y: 2 };
    const cell2 = { x: 3, y: 2 };
    const cell3 = { x: 4, y: 2 };
    const records: Record[] = [[0, cell1, ShootResult.Wounded], [0, cell2, ShootResult.OffTarget], [0, cell3, ShootResult.Killed]];
    const newState = fieldsProcess.reducer(initialFieldsState, setLog(records));

    expect(newState.field2[cell1.y][cell1.x].type).toBe(CellType.Killed);
    expect(newState.field2[cell1.y][cell1.x].value).toBe('x');
    expect(newState.field2[cell2.y][cell2.x].type).toBe(CellType.I);
    expect(newState.field2[cell2.y][cell2.x].value).toBe('point');
    expect(newState.field2[cell3.y][cell3.x].type).toBe(CellType.Killed);
    expect(newState.field2[cell3.y][cell3.x].value).toBe('x');
  });

  it('should show ship on the field case "placeShipOnBattlefield" action', () => {
    const shipCoords = [{ x: 2, y: 2 }, { x: 3, y: 2 }];
    const shipId = 2;
    const ship = new DoubleDeckShip(shipId);
    ship.setCoords(shipCoords[0]);
    const newState = fieldsProcess.reducer(initialFieldsState, placeShipOnBattlefield(ship));

    expect(newState.field1[shipCoords[0].y][shipCoords[0].x].type).toBe(CellType.Ship);
    expect(newState.field1[shipCoords[0].y][shipCoords[0].x].shipId).toBe(shipId);
    expect(newState.field1[shipCoords[1].y][shipCoords[1].x].type).toBe(CellType.Ship);
    expect(newState.field1[shipCoords[1].y][shipCoords[1].x].shipId).toBe(shipId);
  });

  it('should clear particular field area case "moveShip" action', () => {
    const shipCoords = [{ x: 2, y: 2 }, { x: 3, y: 2 }];
    const shipId = 2;
    const ship = new DoubleDeckShip(shipId);
    const curState = cloneDeep(initialFieldsState);
    curState.field1[shipCoords[0].y][shipCoords[0].x].type = CellType.Ship;
    curState.field1[shipCoords[0].y][shipCoords[0].x].shipId = shipId;
    curState.field1[shipCoords[1].y][shipCoords[1].x].type = CellType.Ship;
    curState.field1[shipCoords[1].y][shipCoords[1].x].shipId = shipId;
    const newState = fieldsProcess.reducer(curState, moveShip(ship));

    expect(newState.field1[shipCoords[0].y][shipCoords[0].x].type).toBe(CellType.I);
    expect(newState.field1[shipCoords[0].y][shipCoords[0].x].shipId).toBeNull();
    expect(newState.field1[shipCoords[1].y][shipCoords[1].x].type).toBe(CellType.I);
    expect(newState.field1[shipCoords[1].y][shipCoords[1].x].shipId).toBeNull();
  });

  it('should clear fields if game state changed to "not started"', () => {
    const field = getFieldData(fieldTypes[1]);
    const shipCoords = { x: 2, y: 0 };
    const shipId = 2;

    const field1 = cloneDeep(field);
    field1[shipCoords.y][shipCoords.x].type = CellType.Ship;
    field1[shipCoords.y][shipCoords.x].shipId = shipId;

    const field2 = cloneDeep(field);
    field2[shipCoords.y][shipCoords.x].type = CellType.Ship;
    field2[shipCoords.y][shipCoords.x].shipId = shipId;

    const fieldState = { [FieldName.First]: field1, [FieldName.Second]: field2 };

    expect(fieldsProcess.reducer(fieldState, setGameState(GameState.NotStarted))).toEqual({ [FieldName.First]: field, [FieldName.Second]: field })
  });
});
