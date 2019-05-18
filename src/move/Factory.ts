export type Factory<T> = {
  create(move: MoveTypeEnum): T
}

export enum MoveTypeEnum {
  KAITEN,
  RIGHT,
  LEFT,
  UP,
  DOWN
}