import SinglePlayer from './single-player';

describe('SinglePlayer', () => {
  it('sould have right default properties', () => {
    const player = new SinglePlayer();
    expect(player.id).toBe('user');
    expect(player.name).toBe('user');
    expect(player.type).toBe('human');
  });
});
