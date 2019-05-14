import { SushiMove } from "../SushiMove";
import { MoveTypeEnum } from "../Factory";

export class HorizontalSushi implements SushiMove {
  readonly extName: string
  private readonly direction: MoveTypeEnum.LEFT | MoveTypeEnum.RIGHT
  constructor(extName: string, direction: MoveTypeEnum.LEFT | MoveTypeEnum.RIGHT){
    this.extName = extName
    this.direction = direction
  }
  
  getContent(): string {
    throw new Error("Method not implemented.");
  }
}