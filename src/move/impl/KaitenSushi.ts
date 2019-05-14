import { SushiMove } from "../SushiMove";
import * as vscode from 'vscode';
import * as ResUtils from "../../util/ResUtils";
import * as MathUtils from "../../util/MathUtils";

export class KaitenSushi implements SushiMove {
  readonly extName: string
  constructor(extName: string) {
    this.extName = extName
  }

  getContent(): string {
    const resPngs = ResUtils.getResPngUris()

    //ランダムで8個のSushiを選択
    let urls = "";
    for(let i = 0; i < 8; i++){
      urls += "url\\(";
      urls += resPngs[MathUtils.getRandomInt(0, resPngs.length - 1)]
      urls += "\\)"
      if (i < 8 - 1){
        urls += ",";
      }
    }

    const prefs = vscode.workspace.getConfiguration('SushiBuffetPreferences');
    const opacity = prefs.get<number|undefined>('opacity') ? prefs.get<number|undefined>('opacity') : 0.8;
    const origin = "40% 20%,60% 20%,80% 40%,80% 60%,60% 80%,40% 80%,20% 60%,20% 40%";
    const positionArr = [
      "0% \\{background-position:40% 20%,60% 20%,80% 40%,80% 60%,60% 80%,40% 80%,20% 60%,20% 40%;\\}",
      "12.5% \\{background-position:60% 20%,80% 40%,80% 60%,60% 80%,40% 80%,20% 60%,20% 40%,40% 20%;\\}",
      "25% \\{background-position:80% 40%,80% 60%,60% 80%,40% 80%,20% 60%,20% 40%,40% 20%,60% 20%;\\}",
      "37.5% \\{background-position:80% 60%,60% 80%,40% 80%,20% 60%,20% 40%,40% 20%,60% 20%,80% 40%;\\}",
      "50% \\{background-position:60% 80%,40% 80%,20% 60%,20% 40%,40% 20%,60% 20%,80% 40%,80% 60%;\\}",
      "62.5% \\{background-position:40% 80%,20% 60%,20% 40%,40% 20%,60% 20%,80% 40%,80% 60%,60% 80%;\\}",
      "75% \\{background-position:20% 60%,20% 40%,40% 20%,60% 20%,80% 40%,80% 60%,60% 80%,40% 80%;\\}",
      "87.5% \\{background-position:20% 40%,40% 20%,60% 20%,80% 40%,80% 60%,60% 80%,40% 80%,20% 60%;\\}",
      "100% \\{background-position:40% 20%,60% 20%,80% 40%,80% 60%,60% 80%,40% 80%,20% 60%,20% 40%;\\}"
    ]

    //ポジションを全て結合
    const position = positionArr.join("")
    
    return `/\\*ext-${this.extName}-start\\*/body\\{background-image:${urls};background-position:${origin};background-repeat:no-repeat;background-attachment:fixed;background-size:auto 15%;opacity:${opacity};animation-name:rotate;animation-duration:20s;animation-timing-function:linear;animation-iteration-count:infinite;\\}@keyframes rotate \\{${position}\\}/\\*ext-${this.extName}-end\\*/`;
  }
}