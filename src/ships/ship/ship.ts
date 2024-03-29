import { shipOrientations, ShipClass, ShipOrientation, ShipShape } from '../../const';
import { Coords,  } from '../../types';

const isValidMainPoint = (point: Coords) => {
  const { x, y } = point;
  return x >= 0 && y >= 0;
};

type OrientationMappingType = {
  [index: string]: Function,
};

export default class Ship {
  id: number;
  coords: Coords[];
  mainPoint: Coords | null;
  class: ShipClass | null;
  shape: ShipShape;
  orientation: ShipOrientation;
  orientationMapping: OrientationMappingType;
  isOverField: number;

  constructor(id: number) {
    this.id = id;
    this.coords = [];
    this.mainPoint = null;
    this.class = null;
    this.shape= ShipShape.Line;
    this.orientation = ShipOrientation.East;
    this.orientationMapping = {
      east: ({ x, y }: Coords) : Coords[] => [{ x, y }],
      north: ({ x, y }: Coords) : Coords[] => [{ x, y }],
      west: ({ x, y }: Coords) : Coords[] => [{ x, y }],
      south: ({ x, y }: Coords) : Coords[] => [{ x, y }],
    };
    this.isOverField = 0;
  }

  getCoords() {
    return this.coords;
  }

  getId() {
    return this.id;
  }

  getClass() {
    return this.class;
  }

  getOrientationVariants() {
    return  shipOrientations
      .filter((item) => Object.keys(this.orientationMapping).includes(item));
  }

  calcCoords(mainPoint: Coords) : Coords[] {
    return this.orientationMapping[this.orientation](mainPoint);
  }

  setCoords(mainPoint: Coords) {
    if (!isValidMainPoint(mainPoint)) {
      throw new Error('Invalid coordinates received in ship.setCoords');
    }
    this.mainPoint = mainPoint;
    this.coords = this.calcCoords(this.mainPoint);
  }

  setOrientation(orientation: ShipOrientation) {
    this.orientation = orientation;
    if (this.mainPoint) {
      this.setCoords(this.mainPoint);
    }
  }

  changeOrientation() {
    const posibleOrientations : ShipOrientation[] = this.getOrientationVariants();
    const currentOrientationIndex = posibleOrientations.findIndex((el) => el === this.orientation);
    const nextOrientationIndex = currentOrientationIndex < posibleOrientations.length - 1
      ? currentOrientationIndex + 1 : 0;
    this.setOrientation(posibleOrientations[nextOrientationIndex]);
  }
}
