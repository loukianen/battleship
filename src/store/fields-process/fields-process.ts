import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getFieldData from '../../services/gen-field-data';
import { addNewRecord, setLog } from '../log-process/log-process';
import { moveShip } from '../ship-in-move-process/ship-in-move-process';
import { placeShipOnBattlefield } from '../fleet-process/fleet-process';
import { setGameOptions } from '../game-options-process/game-options-process';
import { setGameState } from '../game-state-process/game-state-process';
import { FieldsPayloadDataType, FieldType, Record } from '../../types';
import { initialGameOptionsState } from '../game-options-process/game-options-process';
import { CellType, FieldName, GameState, NameSpace, ShootResult } from '../../const';
import { Field } from '../../types';
import { FieldTextKey } from '../../locales/types';

const initialFieldSize = initialGameOptionsState.fieldType;

export const initialFieldsState = {
  [FieldName.First]: getFieldData(initialFieldSize),
  [FieldName.Second]: getFieldData(initialFieldSize),
};

export type FieldsStateType = typeof initialFieldsState;
export type MarkShipsAfterGamePayload = { fieldName: FieldName, field: Field };

const getChangesForCell = (actionResult: ShootResult) => {
  const mapping = {
    [ShootResult.Started]: {},
    [ShootResult.Won]: { type: CellType.Killed, value: 'x' as FieldTextKey },
    [ShootResult.OffTarget]: { value: 'point' as FieldTextKey },
    [ShootResult.Killed]: { type: CellType.Killed, value: 'x' as FieldTextKey },
    [ShootResult.Wounded]: { type: CellType.Killed, value: 'x' as FieldTextKey },
  };
  return mapping[actionResult];
};

const processRecord = (state: FieldsStateType, record: Record) => {
  const [playerIndex, coords, actionResult] = record;
  if (coords) {
    const { x, y } = coords;
    const activeField = playerIndex === 0 ? FieldName.Second : FieldName.First;
    const changesForCell = getChangesForCell(actionResult);
    state[activeField][y][x] = { ...state[activeField][y][x], ...changesForCell };
  }
  return state;
}

const fieldsProcess = createSlice({
  name: NameSpace.Fields,
  initialState: initialFieldsState,
  reducers: {
    setFields: (state, action: PayloadAction<FieldsStateType>) => action.payload,
    changeFields: (state, action: PayloadAction<FieldsPayloadDataType>) => {
      [FieldName.First, FieldName.Second].forEach((fieldName) => {
        const data = action.payload[fieldName];
        if (data) {
          data.forEach(({coords: { x, y }, options: { type, value}}) => {
            state[fieldName][y][x].type = type;
            if (value) {
              state[fieldName][y][x].value = value;
            }
          })
        }
      });
      return state;
    },
    markShipsAfterGame: (state, action: PayloadAction<MarkShipsAfterGamePayload>) => {
      const { fieldName, field } = action.payload;
      field.forEach((row, y) => row.forEach((shipId, x) => {
        if (shipId > 0) {
          state[fieldName][y + 1][x + 1].type = CellType.Ship;
          state[fieldName][y + 1][x + 1].shipId = shipId;
        }
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewRecord, (state, action) => {
      processRecord(state, action.payload);
      return state;
    });

    builder.addCase(placeShipOnBattlefield, (state, action) => {
      const ship = action.payload;
      const coords = ship.getCoords();
      for (const {x, y} of coords) {
        state[FieldName.First][y][x] = { ...state[FieldName.First][y][x], type: CellType.Ship, shipId: ship.getId() };
      }
      return state;
    });

    builder.addCase(moveShip, (state, action) => {
      const shipId = action.payload.getId();
      state[FieldName.First].forEach((row) => {
        row.forEach((cell) => {
          if (cell.shipId === shipId) {
            cell.type = cell.defaultType;
            cell.shipId = null;
          }
        });
      });
      return state;
    });

    builder.addCase(setGameOptions, (state, action) => {
      const { fieldType } = action.payload;
      return {[FieldName.First]: getFieldData(fieldType), [FieldName.Second]: getFieldData(fieldType)};
    });

    builder.addCase(setGameState, (state, action) => {
      const gameState = action.payload;
      if (gameState === GameState.NotStarted) {
        const currentFieldType = String(state[FieldName.First].length - 1) as FieldType;
        state = {[FieldName.First]: getFieldData(currentFieldType), [FieldName.Second]: getFieldData(currentFieldType)};
      }
      return state;
    });

    builder.addCase(setLog, (state, action) => {
      const records = action.payload;
      records.forEach((record) => {
        processRecord(state, record);
      })
      return state;
    });
  },
});

export const { changeFields, markShipsAfterGame, setFields } = fieldsProcess.actions;

export default fieldsProcess;
