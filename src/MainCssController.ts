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
  
  /**
   * Generate the Css Content.
   * @param order sushi neta
   */
  generateContent(order: string): string {
    //resフォルダを強引に取得
    const resPath = path.join(__dirname.substring(0, __dirname.length - 4), 'res');
    
    //pngを強引に取得
    const orderPath = path.join(resPath, `sushi_${order}.png`).replace(/\\/g, '\\\\\\\\\\\\\\\\');

    if (fs.existsSync(orderPath)) {
      console.log("Exists!");
    } else {
      //ネタ名が間違えてたらスロー
      throw new ReferenceError();
    }
    
    const prefs = vscode.workspace.getConfiguration('Sushi Buffet Preferences');
    const opacity = prefs.get<number|undefined>('opacity') ? prefs.get<number|undefined>('opacity') : 0.8;
    
    return `/\\*ext-${this.extName}-start\\*/body\\{background-position:center center;background-repeat:no-repeat;background-attachment:fixed;background-size:250px auto;opacity:${opacity};background-image:url\\("${orderPath}"\\);\\}/\\*ext-${this.extName}-end\\*/`;
  }

  addCssContent(order: string) {
    const content = this.generateContent(order);
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
    cp.exec(`sed -i -e "s|${delContent}||g" -e "/^[<space><tab>]*$/d" -e "/\\n$/d" -e"/\\r$/d" "${this.mainCssPath}"`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        console.log(stdout);
      }
    });
  }
}
