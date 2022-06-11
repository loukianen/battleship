import { generateField } from './utils';
import { Field, FieldType } from './types';

describe('function generateField', () => {
  type testDataType = Array<[FieldType, Field]>;
  const array3 = [null, null, null];
  const array5 = [null, null, null, null, null];
  const testData: testDataType = [
    ['3', [array3, array3, array3]],
    ['5', [array5, array5, array5, array5, array5]],
  ];

  it.each(testData)('should create rigth array size %s', (size: FieldType, result: Field) => {
    expect(generateField(size)).toEqual(result);
  });
});
