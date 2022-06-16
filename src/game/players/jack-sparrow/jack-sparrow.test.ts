import JackSparrow from './jack-sparrow';

describe('JackSparrow', () => {
  it('sould have right default properties', () => {
    const player = new JackSparrow();
    expect(player.id).toBe('jack');
    expect(player.name).toBe('Jack Sparrow');
    expect(player.type).toBe('robot');
    expect(player.field).toEqual([]);
    expect(player.enemyField).toEqual([]);
    expect(player.fleet).toEqual([]);
  });
});
