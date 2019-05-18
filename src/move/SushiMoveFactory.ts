import { Factory, MoveTypeEnum } from "./Factory";
import { SushiMove } from "./SushiMove";
import * as kaiten from "./impl/KaitenSushi";
import * as horizontal from "./impl/HorizontalSushi";
import * as vertical from "./impl/VerticalSushi";

export class SushiMoveFactory implements Factory<SushiMove> {
  // TODO グローバルに拡張機能名取得できるんじゃないかなぁ……
  private static readonly extName = 'sushi-buffet'
  
  create(moveType: MoveTypeEnum): SushiMove {
    switch(moveType) {
      case MoveTypeEnum.KAITEN :
        return new kaiten.KaitenSushi(SushiMoveFactory.extName)
      case MoveTypeEnum.LEFT :
      case MoveTypeEnum.RIGHT :
        return new horizontal.HorizontalSushi(SushiMoveFactory.extName, moveType)
      case MoveTypeEnum.UP :
      case MoveTypeEnum.DOWN :
        return new vertical.VerticalSushi(SushiMoveFactory.extName, moveType)
    }
  }
}