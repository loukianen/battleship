import game from './game';
// import { Player } from '../../types';

describe('Modul Game', () => {
  it('should has right default setting', () => {
   expect(game.players).toEqual([]);
   expect(game.fields).toEqual([]);
   expect(game.fieldType).toBe('10');
   expect(game.shipShape).toBe('line');
   expect(game.activePlayer).toBeUndefined();
  });
});
