import { Field, FieldType } from "./types";

export const generateField = (size: FieldType) :Field => {
  const fieldSize = Number(size);
  return Array(fieldSize).fill(Array(fieldSize).fill(null));
};
