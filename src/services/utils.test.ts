import { generateField } from './utils';
import { Field, FieldType } from '../types';

describe('function generateField', () => {
  type testDataType = Array<[FieldType, Field]>;
  const array3 = Array(3).fill(0);
  const array5 = Array(5).fill(0);
  const array7 = Array(7).fill(0);
  const array10 = Array(10).fill(0);
  const testData: testDataType = [
    ['3', Array(3).fill(array3)],
    ['5', Array(5).fill(array5)],
    ['7', Array(7).fill(array7)],
    ['10', Array(10).fill(array10)],
  ];

  it.each(testData)('should create rigth array size %s', (size: FieldType, result: Field) => {
    expect(generateField(size)).toEqual(result);
  });
});
