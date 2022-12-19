import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getFieldData from '../../services/gen-field-data';
import { setGameOptions } from '../game-options-process/game-options-process';
import { FieldsPayloadDataType, FieldType } from '../../types';
import { NameSpace } from '../../const';

const initialFieldSize = '10';

export const initialFieldsState = {
  field1: getFieldData(initialFieldSize),
  field2: getFieldData(initialFieldSize),
};

type FieldsStateType = typeof initialFieldsState;

const wasFildTypeChanged = (fieldType: FieldType, state: FieldsStateType) => {
  const oldFieldType = state.field1.length - 1;
  const newFieldType = Number(fieldType);
  return oldFieldType !== newFieldType;
};

const fieldsProcess = createSlice({
  name: NameSpace.Fields,
  initialState: initialFieldsState,
  reducers: {
    changeField: (state, action: PayloadAction<FieldsPayloadDataType>) => state,
  },
  extraReducers: (builder) => {
    builder.addCase(setGameOptions, (state, action) => {
      const { fieldType } = action.payload;
      if (fieldType && wasFildTypeChanged(fieldType, state)) {
        state = { field1: getFieldData(fieldType), field2: getFieldData(fieldType)};
      }
      return state;
    });
  },
});

export const { changeField } = fieldsProcess.actions;

export default fieldsProcess;
