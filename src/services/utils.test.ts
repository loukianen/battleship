import isEqual from 'lodash-ts/isEqual';
import { calcArea, generateField, uniqueId, getLocalizedUsername } from './utils';
import { Field, FieldType, Player } from '../types';
import i18n from 'i18next';
import en from '../locales/en';
import ru from '../locales/ru';
import { PlayerType } from '../const';

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

describe('getLocalizedUserName', () => {
  describe('english', () => {
    beforeAll(() => i18n.init({
      debug: false,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      resources: {
        en: {
          translation: en,
        },
        ru: {
          translation: ru,
        },
      },
    }));

    const testData: [Player, string][] = [
      [{ id: 'user', name: 'user', type: PlayerType.Human }, 'You'],
      [{ id: 'ushakov', name: 'some name', type: PlayerType.Robot }, 'Ushakov'],
      [{ id: 'jack', name: 'some name', type: PlayerType.Robot }, 'Jack Sparrow'],
      [{ id: 'nahimov', name: 'some name', type: PlayerType.Robot }, 'Nahimov'],
    ];
    it.each(testData)('should return english username %s', (player: Player, originalName: string) => {
      expect(getLocalizedUsername(player, i18n)).toBe(originalName);
    });

    it('should return original name if user id is unknown', () => {
      const userName = 'Unknown Username'
      const user = { id: 'unknown', name: userName, type: PlayerType.Human };
      expect(getLocalizedUsername(user, i18n)).toBe(userName);
    });
  });

  describe('russian', () => {
    beforeAll(() => i18n.init({
      debug: false,
      lng: 'ru',
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      resources: {
        en: {
          translation: en,
        },
        ru: {
          translation: ru,
        },
      },
    }));

    const testData: [Player, string][] = [
      [{ id: 'user', name: 'user', type: PlayerType.Human }, 'Вы'],
      [{ id: 'ushakov', name: 'some name', type: PlayerType.Robot }, 'Ушаков'],
      [{ id: 'jack', name: 'some name', type: PlayerType.Robot }, 'Джек Воробей'],
      [{ id: 'nahimov', name: 'some name', type: PlayerType.Robot }, 'Нахимов'],
    ];

    it.each(testData)('should return russian username %s', (player: Player, originalName: string) => {
      expect(getLocalizedUsername(player, i18n)).toBe(originalName);
    });

    it('should return original name if user id is unknown', () => {
      const userName = 'Unknown Username'
      const user = { id: 'unknown', name: userName, type: PlayerType.Robot };
      expect(getLocalizedUsername(user, i18n)).toBe(userName);
    });
  });
});
