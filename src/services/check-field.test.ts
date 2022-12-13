import cloneDeep from 'lodash-ts/cloneDeep';
import checkField from './check-field';
import { GameErrorMessage, ShipShape } from '../const';
import { Field } from '../types';
import { generateField } from './utils';

describe('function checkField', () => {
  const fild3 = generateField('3');
  const fild5 = generateField('5');

  const validField3 = cloneDeep(fild3);
  validField3[0][1] = 1;

  const validField5 = cloneDeep(fild5);
  validField5[0][0] = 1;
  validField5[1][0] = 1;
  validField5[2][3] = 2;
  validField5[4][3] = 3;

  it.each([[validField3], [validField5]])('should return true if field valid %i', (validField) => {
    expect(checkField(validField)).toBeTruthy();
  });

  it('should throw an error if shipeShape != "line"', () => {
    expect(() => checkField(validField3, ShipShape.Any)).toThrowError(new Error(GameErrorMessage.ShapeAny));
  });

  const incorrectField1 : Field = cloneDeep(validField3);
  incorrectField1.push([0, 0, 0]);
  const incorrectField2 : Field = cloneDeep(validField3);
  incorrectField2[0].push(0);
  const incorrectField3 : Field = incorrectField1.map((row) => [...row, 0]);

  it.each([[incorrectField1], [incorrectField2], [incorrectField3]])(
    'should throw an error if field size incorrect %i',
    (incorrectField: Field) => {
      expect(() => checkField(incorrectField)).toThrowError(new Error(GameErrorMessage.FieldType));
  });

  it('should throw an error if ship has more than one id', () => {
      const incorrectField = cloneDeep(validField5);
      incorrectField[1][0] = 4;
      expect(() => checkField(incorrectField)).toThrowError(new Error(GameErrorMessage.ShipIds));
  });

  it('should throw an error if ships collection incorrect', () => {
      const fieldWithWrongShipType = cloneDeep(validField5);
      fieldWithWrongShipType[2][0] = 1;

      const fieldWithExtraShip = cloneDeep(validField5);
      fieldWithExtraShip[4][0] = 4;

      expect(() => checkField(fieldWithWrongShipType)).toThrowError(new Error(GameErrorMessage.ShipsCollection));
      expect(() => checkField(fieldWithExtraShip)).toThrowError(new Error(GameErrorMessage.ShipsCollection));
  });

  it('should throw an error if different ships has the same id', () => {
    const incorrectField = cloneDeep(validField5);
    incorrectField[4][3] = 2;
    expect(() => checkField(incorrectField)).toThrowError(new Error(GameErrorMessage.ShipUniqueId));
  });

  it('should throw an error if ships position is not correct', () => {
    const incorrectField = cloneDeep(validField5);
    incorrectField[4][3] = 0;
    incorrectField[3][2] = 3;
    expect(() => checkField(incorrectField)).toThrowError(new Error(GameErrorMessage.ShipsPosition));
  });
});
