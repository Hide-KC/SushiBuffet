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
  generateContent(): string {
    //resフォルダを強引に取得
    const resPath = path.join(__dirname.substring(0, __dirname.length - 4), 'res');
    const resPngs = fs.readdirSync(resPath);

    let urls = "";
    for(let i = 0; i < resPngs.length; i++){
      urls += "url\\(";
      urls += path.join(resPath, resPngs[i]).replace(/\\/g, '\\\\\\\\\\\\\\\\');
      urls += "\\)"
      if (i < resPngs.length - 1){
        urls += ",";
      }
    }

    const prefs = vscode.workspace.getConfiguration('SushiBuffetPreferences');
    const opacity = prefs.get<number|undefined>('opacity') ? prefs.get<number|undefined>('opacity') : 0.8;
    
    return `/\\*ext-${this.extName}-start\\*/body\\{background-image:${urls};background-position:left top, 25% top, 50% top, 75% top, right top,left 25%, 25% 25%, 50% 25%, 75% 25%, right 25%,left 50%, 25% 50%, 50% 50%, 75% 50%, right 50%,left 75%, 25% 75%, 50% 75%, 75% 75%, right 75%,left bottom, 25% bottom, 50% bottom, 75% bottom, right bottom;background-repeat:no-repeat;background-attachment:fixed;background-size:auto 20%;opacity:${opacity};animation:slideIn 2.5s ease-in-out 1s 1 normal\\}@keyframes slideIn \\{0% \\{opacity: ${opacity};background-position:100% top, 150% top, 150% top, 150% top, 150% top, 150% 25%, 125% 25%, 150% 25%, 150% 25%, 150% 25%, 150% 50%, 150% 50%, 150% 50%, 150% 50%, 150% 50%, 150% 75%, 150% 75%, 150% 75%, 175% 75%, 150% 75%, 150% bottom, 150% bottom, 150% bottom, 150% bottom, 200% bottom;\\}50% \\{opacity: ${opacity};background-position:-200% top, 150% top, 150% top, 150% top, 150% top, 150% 25%, -175% 25%, 150% 25%, 150% 25%, 150% 25%, 150% 50%, 150% 50%, -150% 50%, 150% 50%, 150% 50%, 150% 75%, 150% 75%, 150% 75%, -125% 75%, 150% 75%, 150% bottom, 150% bottom, 150% bottom, 150% bottom, -100% bottom;\\}100% \\{opacity: ${opacity};background-position:left top, 25% top, 50% top, 75% top, right top,left 25%, 25% 25%, 50% 25%, 75% 25%, right 25%,left 50%, 25% 50%, 50% 50%, 75% 50%, right 50%,left 75%, 25% 75%, 50% 75%, 75% 75%, right 75%,left bottom, 25% bottom, 50% bottom, 75% bottom, right bottom;\\}\\}/\\*ext-${this.extName}-end\\*/`;
  }

  addCssContent() {
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
