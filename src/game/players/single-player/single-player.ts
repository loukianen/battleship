import { Human } from "../../../types";

export default class SinglePlayer implements Human {
  id;
  name;
  type: 'human';

  constructor() {
    this.id = 'user';
    this.name = 'user';
    this.type = 'human';
  }
};
