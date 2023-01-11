import { letters } from './utils';
import { Cell, FieldType } from '../types';
import { CellType } from '../const';

const generateFirstRow = (size: number) => {
  const values = [null, ...letters.slice(0, size - 1)];
  let currentId = 1;
  const row = values.map((value, index) => {
    const cell : Cell = {
      id: currentId,
      shipId: null,
      type: CellType.Clear,
      defaultType: CellType.Clear,
      value,
      coords: { x: index, y: 0 },
    };
    currentId += 1;
    return cell;
  });
  return row;
};

const generateRow = (cellTypes: CellType[], number: number) => {
  let currentId = number * 100 + 1;
  const row = cellTypes.map((type, index) => {
    const coords = { x: index, y: number };
    const cell : Cell = {
      id: currentId,
      shipId: null,
      type,
      defaultType: type,
      value: index === 0 ? number : null,
      coords,
    };
    currentId += 1;
    return cell;
  });
  return row;
};

const generateRestRows = (size: number) => {
  const amountOfMiddleElements = size - 3; // 3 = number, first end last column
  const stylesMapping = {
    first: [CellType.Clear, CellType.TL, ...Array(amountOfMiddleElements).fill(CellType.T), CellType.TR],
    middle: [CellType.Clear, CellType.L, ...Array(amountOfMiddleElements).fill(CellType.I), CellType.R],
    last: [CellType.Clear, CellType.BL, ...Array(amountOfMiddleElements).fill(CellType.B), CellType.BR],
  };
  let counter = size - 1;
  const lineNumbers = Array(size - 1)
    .fill(size)
    .map((number) => {
      const newNumber = number - counter;
      counter -= 1;
      return newNumber;
    });
  const rows = lineNumbers.map((number, index) => {
    let styles;
    switch (index) {
      case 0:
        styles = stylesMapping.first;
        break;
      case lineNumbers.length - 1:
        styles = stylesMapping.last;
        break;
      default:
        styles = stylesMapping.middle;
        break;
    }
    const row = generateRow(styles, number);
    return row;
  });
  return rows;
};

const getFieldData = (battleFieldSize : FieldType = '10') => {
  const size = Number(battleFieldSize) + 1;
  const field = [generateFirstRow(size), ...generateRestRows(size)];
  return field;
};

export default getFieldData;
