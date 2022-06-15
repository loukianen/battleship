import { generateField } from "../../../services/utils";
import { Field, FieldType, Record, Robot, ShipShape } from "../../../types";

export default class JackSparrow implements Robot {
  id;
  name;
  type: 'robot';
  field: Field;
  fleet: [];
  enemyField: Field;

  constructor() {
    this.id = 'jack';
    this.name = 'Jack Sparrow';
    this.type = 'robot';
    this.field = [];
    this.fleet = [];
    this.enemyField = [];
  }

  shoot() {
    return { x: 0, y: 0 };
  }

  handleShoot(record: Record) {}

  makeField(fieldType: FieldType, shipsShapeType: ShipShape) {
    this.field = generateField(fieldType);
    this.enemyField = generateField(fieldType);
    return [];
  }
};
