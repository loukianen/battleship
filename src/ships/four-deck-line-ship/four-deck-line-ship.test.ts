import FourDeckLineShip from "./four-deck-line-ship";

describe('FourDeckLineShip', () => {
  it('should have class "fourDeck"', () => {
    const ship = new FourDeckLineShip('1');
    expect(ship.getClass()).toBe('fourDeck');
  });

  it('calculate its coords correctly including after the orientation has been changed', () => {
    const mainPoint = {x: 2, y: 3};
    const expectedCoordsWithEast = [{x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}, {x: 4, y: 3}];
    const ship = new FourDeckLineShip('2');
    ship.setOrientation('east');
    expect(ship.calcCoords(mainPoint)).toEqual(expectedCoordsWithEast);
    
    const expectedCoordsWithNorth = [{x: 2, y: 2}, {x: 2, y: 3}, {x: 2, y: 4}, {x: 2, y: 5}];
    ship.setOrientation('north');
    expect(ship.calcCoords(mainPoint)).toEqual(expectedCoordsWithNorth);
  });
});
