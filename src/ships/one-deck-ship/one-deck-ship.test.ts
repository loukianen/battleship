import OneDeckShip from "./one-deck-ship";

describe('OneDeckShip', () => {
  it('should have class "oneDeck"', () => {
    const ship = new OneDeckShip(1);
    expect(ship.getClass()).toBe('oneDeck');
  });

  it('calculate its coords correctly including after the orientation has been changed', () => {
    const mainPoint = {x: 2, y: 3};
    const expectedCoords = [{x: 2, y: 3}];
    const ship = new OneDeckShip(2);
    ship.setOrientation('east');
    expect(ship.calcCoords(mainPoint)).toEqual(expectedCoords);

    ship.changeOrientation();
    expect(ship.calcCoords(mainPoint)).toEqual(expectedCoords);
  });
});
