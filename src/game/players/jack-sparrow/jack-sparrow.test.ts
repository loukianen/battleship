import JackSparrow from './jack-sparrow';
import checkField from '../../../services/check-field';
import { generateField, generateShipsList } from '../../../services/utils';
import { fieldTypes } from '../../../const';

describe('JackSparrow', () => {
  it('sould have right default properties', () => {
    const player = new JackSparrow();
    expect(player.id).toBe('jack');
    expect(player.name).toBe('Jack Sparrow');
    expect(player.type).toBe('robot');
    expect(player.enemyShipsList).toEqual({});
    expect(player.enemyField).toEqual([]);
    expect(player.shipShape).toBe('line');
    expect(player.woundedEnemyShip).toEqual([]);
  });

  it.each(fieldTypes)('should generate correct battlefield (size %s)', (fieldType) => {
    const jack = new JackSparrow();
    const field = generateField(fieldType);
    const shipsList = generateShipsList(fieldType);
    const battlefield = jack.generateBattlefield(field, shipsList);

    expect(() => checkField(battlefield)).not.toThrow();
  });
});
