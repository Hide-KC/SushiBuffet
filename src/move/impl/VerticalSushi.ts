import { SushiMove } from "../SushiMove";
import { MoveTypeEnum } from "../Factory";

export class VerticalSushi implements SushiMove {
  readonly extName: string
  private readonly direction: MoveTypeEnum.UP | MoveTypeEnum.DOWN
  constructor(extName: string, direction: MoveTypeEnum.UP | MoveTypeEnum.DOWN){
    this.extName = extName
    this.direction = direction
  }
  
  getContent(): string {
    throw new Error("Method not implemented.");
  }
}