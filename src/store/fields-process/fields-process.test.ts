import fieldsProcess, { initialFieldsState } from './fields-process';
import { setGameOptions } from '../game-options-process/game-options-process';
import { fieldTypes, PlayerType, ShipShape } from '../../const';

describe('Reducer: fieldsProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(fieldsProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(initialFieldsState);
  });

  it('should shange field size if game options had been changed', () => {
    const newGameOptionsPayLoad = {
      players: [
        {id: 'newId', name: 'playerName', type: PlayerType.Robot},
        {id: 'unknown', name: 'unknown', type: PlayerType.Robot},
      ],
      fieldType: fieldTypes[0],
      shipType: ShipShape.Line,
    };;
    const newField = fieldsProcess.reducer(initialFieldsState, setGameOptions(newGameOptionsPayLoad));
    expect(newField.field1.length).toBe(Number(newGameOptionsPayLoad.fieldType) + 1);
    expect(newField.field2.length).toBe(Number(newGameOptionsPayLoad.fieldType) + 1);
  });
});
