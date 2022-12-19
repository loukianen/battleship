import genField from './gen-field-data';
import gaugeField from './gouge-field';
import { Cell } from '../types';

type PropType = keyof Cell;

const props: PropType[] = ['id', 'shipId', 'type', 'defaultType', 'value', 'coords'];
const fieldSize = '3';
const field = genField(fieldSize);

describe('genField', () => {
  it('should generate correct field', () => {
    gaugeField.forEach((line, y) => {
      line.forEach((cell, x) => {
        props.forEach((prop) => {
          expect(field[y][x][prop]).toEqual(cell[prop]);
        });
      });
    });
  });

  it('cells should have unique id', () => {
    const ids = new Set();
    field.forEach((line) => {
      line.forEach((cell) => {
        ids.add(cell.id);
      });
    });
    expect(ids.size).toBe((Number(fieldSize) + 1) ** 2);
  });
});