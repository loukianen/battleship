import { generateField, isFieldValid } from './utils';
import { Field, FieldType } from './types';

xdescribe('function generateField', () => {
  type testDataType = Array<[FieldType, Field]>;
  const array3 = [0, 0, 0];
  const array5 = [0, 0, 0, 0, 0];
  const testData: testDataType = [
    ['3', [array3, array3, array3]],
    ['5', [array5, array5, array5, array5, array5]],
  ];

  it.each(testData)('should create rigth array size %s', (size: FieldType, result: Field) => {
    expect(generateField(size)).toEqual(result);
  });
});

describe('function isFieldValid', () => {
  it('should return true if field valid', () => {
    const validField1 = [[0, 1, 0], [0, 0, 0], [0, 0, 0]];
    const validField2 = [
      [3, 0, 0, 0, 0],
      [3, 0, 0, 0, 0],
      [0, 0, 0, 2, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
    ];

    expect(isFieldValid(validField1)).toBeTruthy();
    expect(isFieldValid(validField2)).toBeTruthy();
  });
});
