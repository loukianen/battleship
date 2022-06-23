import isEqual from 'lodash-ts/isEqual';
import { calcArea, generateField, uniqueId } from './utils';
import { Field, FieldType } from '../types';

describe('Function CalcArea', () => {
  const shipCoords = [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 3 }];
  const corners = [{ x: 0, y: 0 }, { x: 0, y: 4 }, { x: 3, y: 4 }, { x: 3, y: 2 }, { x: 2, y: 0 }];
  const otherArea = [
    { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 },
    { x: 1, y: 4 }, { x: 2, y: 4 },
    { x: 3, y: 3 },
    { x: 2, y: 2 }, { x: 2, y: 1 },
    { x: 1, y: 0 },
  ];
  const allArea = [...otherArea, ...corners];

  const calculatedAreaOnlyCorners = calcArea(shipCoords, 'corners');
  const calculatedAreaWithoutCorners = calcArea(shipCoords, 'without');
  const calculatedArea = calcArea(shipCoords); // equal  calcArea(shipCoords, 'with')

  it('Lenths of calculated arrays should be equal to etalons', () => {
    expect(calculatedAreaOnlyCorners.length).toBe(corners.length);
    expect(calculatedAreaWithoutCorners.length).toBe(otherArea.length);
    expect(calculatedArea.length).toBe(allArea.length);
  });

  it.each(calculatedAreaOnlyCorners)('should get rigth area with "corners" - option', (coords) => {
    const isCornersIncludesCoords = !corners.every((item) => !isEqual(item, coords));
    expect(isCornersIncludesCoords).toBeTruthy();
  });
  
  it.each(calculatedAreaWithoutCorners)('should get rigth area with "without" - option', (coords) => {
    const isOtherAreaIncludesCoords = !otherArea.every((item) => !isEqual(item, coords));
    expect(isOtherAreaIncludesCoords).toBeTruthy();
  });
  
  it.each(calculatedArea)('should get rigth area with "with" - option', (coords) => {
    const isAllAreaIncludesCoords = !allArea.every((item) => !isEqual(item, coords));
    expect(isAllAreaIncludesCoords).toBeTruthy();
  });
})

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

it('UniqueId should return a new id after each calling', () => {
  expect(uniqueId()).toBe(1);
  expect(uniqueId()).toBe(2);
  expect(uniqueId()).toBe(3);
});
