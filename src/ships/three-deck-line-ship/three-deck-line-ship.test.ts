import ThreeDeckLineShip from "./three-deck-line-ship";
import { ShipClass, ShipOrientation } from "../../const";

describe('ThreeDeckLineShip', () => {
  it('should have class "threeDeck"', () => {
    const ship = new ThreeDeckLineShip(1);
    expect(ship.getClass()).toBe( ShipClass.Three);
  });

  it('calculate its coords correctly including after the orientation has been changed', () => {
    const mainPoint = {x: 2, y: 3};
    const expectedCoordsWithEast = [{x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}];
    const ship = new ThreeDeckLineShip(2);
    ship.setOrientation(ShipOrientation.East);
    expect(ship.calcCoords(mainPoint)).toEqual(expectedCoordsWithEast);
    
    const expectedCoordsWithNorth = [{x: 2, y: 2}, {x: 2, y: 3}, {x: 2, y: 4}];
    ship.setOrientation(ShipOrientation.North);
    expect(ship.calcCoords(mainPoint)).toEqual(expectedCoordsWithNorth);
  });
});
