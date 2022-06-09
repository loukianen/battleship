import { availablePlayers } from "./game";
import { Player } from '../types';

it('lala', () => {
  const t = availablePlayers.map((el) => new el()).reduce((acc, el) => {
    const id = el.id;
    acc.ids.push(id);
    acc[id] = el;
    return acc;
  }, { ids: [] as string[] } as { ids: Array<string>, [index: string]: Array<string> | Player });
  // console.log(t);
  expect(availablePlayers).toBeInstanceOf(Array);
});
