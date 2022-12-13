import Ship from './ship';
import { ShipOrientation, shipOrientations, ShipShape } from '../../const';

describe('Ship', () => {
  it('Should have right default proprerties', () => {
    const ship = new Ship(1);
    const defaultValues = {id: 1, coords: [], mainPoint: null, class: null, shape: ShipShape.Line, orientation: ShipOrientation.East };

    expect(ship).toMatchObject(defaultValues);
  });

  it('method "setCoords" should work correctly', () => {
    const ship = new Ship(2);
    const ship1 = new Ship(3);
    ship.setCoords({x: 1, y: 2});

    expect(ship).toMatchObject({ id: 2, coords: [{x: 1, y: 2}]});
    expect(() => ship1.setCoords({x: -1, y: 2})).toThrowError();
  });

  describe('method "setOrientation" should', () => {
    it('work correctly', () => {
      const ship = new Ship(1);
      ship.setOrientation(ShipOrientation.West);

      expect(ship).toMatchObject({ id: 1, orientation: ShipOrientation.West });
    });

    it('should run method "setCoords" if main point was defined', () => {
      const ship = new Ship(1);
      ship.setCoords = jest.fn();
      ship.setOrientation(ShipOrientation.West);
      expect(ship.mainPoint).toBeNull();
      expect(ship.setCoords).not.toBeCalled();

      ship.mainPoint = {x:1, y:1};
      ship.setOrientation(ShipOrientation.North);
      expect(ship.setCoords).toBeCalled();
    });
  });

  it('Getters work correctly', () => {
    const id = 3;
    const coords = { x:2, y: 4 };
    const ship = new Ship(id);
    ship.setCoords(coords);

    expect(ship.getClass()).toBeNull();
    expect(ship.getId()).toBe(id);
    expect(ship.getCoords()).toEqual([coords]);
    expect(ship.getOrientationVariants().length).toBeGreaterThan(0);
  });

  describe('Function changeOrientation should set next or first value from posible values', () => {
    it('with any ships', () => {
      const ship = new Ship(4);
      ship.shape = ShipShape.Any;
      ship.setOrientation(shipOrientations[1]);

      ship.changeOrientation();
      expect(ship.orientation).toBe(shipOrientations[2]);

      ship.changeOrientation();
      expect(ship.orientation).toBe(shipOrientations[3]);
      
      ship.changeOrientation();
      expect(ship.orientation).toBe(shipOrientations[0]);
    });
  });
});
