import BasicFleetLocationStrategy from './basic-fleet-location-strategy';
import Ship from '../../../ships/ship/ship';
import { generateField, generateShipsList } from '../../../services/utils';
import { fieldTypes } from '../../../const';
import { FieldType } from '../../../types';

const battlefieldCellForChecking = {
  id: expect.any(Number),
  type: 'clear',
  shipId: null,
  coords: { x: expect.any(Number), y: expect.any(Number) },
};
const makeBattlefieldForChecking = (size: FieldType) => {
  const arraySize = Number(size);
  return Array.from(Array(arraySize), () => Array(arraySize).fill(battlefieldCellForChecking));
};

describe('BasicFleetLocationStrategy', () => {

  it.each(fieldTypes)('Should made own battlefiel size %s', (item) => {
    const size = item as FieldType;
    const field =  generateField(size);
    const shipList = generateShipsList(size);
    const expectedField = makeBattlefieldForChecking(size);
    
    const strategy = new BasicFleetLocationStrategy();
    const battleField = strategy.getBattleField(field, shipList);

    expect(battleField).toMatchObject(expectedField);
  });

  it.each(fieldTypes)('Cells should have unique id. For field size %s', (item) => {
    const size = item as FieldType;
    const field =  generateField(size);
    const shipList = generateShipsList(size);
    
    const strategy = new BasicFleetLocationStrategy();
    const battleField = strategy.getBattleField(field, shipList);
    
    const ids = new Set();
    battleField.forEach((row) => {
      row.forEach(({ id }) => {
        ids.add(id);
      });
    });
    const cellsAmount = Number(size) ** 2;

    expect(ids.size).toBe(cellsAmount);
  });

  it.each(fieldTypes)('Should create fleet for size %s', (item) => {
    const size = item as FieldType;
    const field =  generateField(size);
    const shipList = generateShipsList(size);
    
    const strategy = new BasicFleetLocationStrategy();
    strategy.getBattleField(field, shipList);
    const fleet = strategy.fleet;

    fleet.forEach((ship) => {
      expect(ship).toBeInstanceOf(Ship);
    })

    const shipsClasses = fleet.reduce((acc: { [i: string]: number }, ship) => {
      const shipClass = ship.class as string;
      if (acc[shipClass]) {
        acc[shipClass] += 1;
      } else {
        acc[shipClass] = 1;
      }
      return acc;
    }, {});

    expect(shipsClasses).toEqual(shipList);
  });
});
