import DoubleDeckShip from "./double-deck-ship";
import { ShipClass, ShipOrientation } from '../../const';

describe('DoubleDeckShip', () => {
  it('should have class "doubleDeck"', () => {
    const ship = new DoubleDeckShip(1);
    expect(ship.getClass()).toBe(ShipClass.Double);
  });

  it('calculate its coords correctly including after the orientation has been changed', () => {
    const mainPoint = {x: 2, y: 3};
    const expectedCoordsWithEast = [{x: 2, y: 3}, {x: 3, y: 3}];
    const ship = new DoubleDeckShip(2);
    ship.setOrientation(ShipOrientation.East);
    expect(ship.calcCoords(mainPoint)).toEqual(expectedCoordsWithEast);
    
    const expectedCoordsWithNorth = [{x: 2, y: 3}, {x: 2, y: 4}];
    ship.setOrientation(ShipOrientation.North);
    expect(ship.calcCoords(mainPoint)).toEqual(expectedCoordsWithNorth);
  });
});
