import * as fs from 'fs';
import * as cp from 'child_process';
import * as vscode from 'vscode';
import * as path from 'path';

export default class MainCssController {
  private static instance: MainCssController;
  private extName: string;
  private mainCssPath: string;
  private backupName: string;

  private constructor(
    extName: string,
    mainCssPath: string
  ) {
    this.extName = extName;
    this.mainCssPath = mainCssPath;
    this.backupName = this.mainCssPath + '.backup';
  }

  static getInstance(extName: string, mainCssPath: string){
    if (!this.instance){
      this.instance = new MainCssController(extName, mainCssPath);
    }
    return this.instance;
  }

  //workbench.main.cssのコンテンツを取得するとかなり長い文字列
  //シェルっぽくファイル操作でやった方がよさげ
  //バックアップファイルが無ければ生成する（main.css.backup）

  /**
   * Generate workbench.main.css.backup
   * if there are no backup files.
   */
  generateBackup() {
    if (!fs.existsSync(this.backupName)) {
      fs.copyFileSync(this.mainCssPath, this.backupName, fs.constants.COPYFILE_EXCL);
    }
  }
  
  private replaceBackSlash1To16(str: string) {
    return str.replace(/\\/g, '\\\\\\\\\\\\\\\\');
  }

  /**
   * Generate the Css Content.
   * @param order sushi neta
   */
  private generateContent(): string {
    //resフォルダを強引に取得
    const resPath = path.join(__dirname.substring(0, __dirname.length - 4), 'res');
    const resPngs = fs.readdirSync(resPath);

    //ランダムで8個のSushiを選択
    let urls = "";
    for(let i = 0; i < 8; i++){
      urls += "url\\(";
      urls += path.join(resPath, resPngs[this.getRandomInt(0,24)]).replace(/\\/g, '\\\\\\\\\\\\\\\\');
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

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  /**
   * Add css content to workbench.main.css.
   */
  addCssContent() {
    if (!fs.existsSync(this.backupName)) {
      vscode.window.showErrorMessage("workbench.main.css.backupが見つからなかったため処理を中止します")
      return
    }
    
    const content = this.generateContent();
    const delContent = `/\\*ext-${this.extName}-start\\*/.*/\\*ext-${this.extName}-end\\*/`;
    console.log(content);

    cp.exec(`sed -i -e "s|${delContent}||g" -e "$a ${content}" -e "/^[<space><tab>]*$/d" "${this.mainCssPath}"`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        console.log(stdout);
      }
    });
  }
  
  /**
   * Reset content of workbench.main.css to original.
   */
  resetCssContent() {
    //削除する文字列を正規表現で指定
    const delContent = `/\\*ext-${this.extName}-start\\*/.*/\\*ext-${this.extName}-end\\*/`;
    
    //sed で対象文字列を削除→空行を削除→最終行の改行コードを削除
    cp.exec(`sed -i -e "s|${delContent}||g" -e "/^[<space><tab>]*$/d" -e "/\\n$/d" -e "/\\r$/d" "${this.mainCssPath}"`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        console.log(stdout);
      }
    });
  }
}
