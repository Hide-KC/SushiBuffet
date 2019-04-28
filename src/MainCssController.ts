import * as fs from 'fs';
import * as cp from 'child_process';

export default class MainCssController {
  private extName: string;
  private mainCssPath: string;

  constructor(
    extName: string,
    mainCssPath: string
  ) {
    this.extName = extName;
    this.mainCssPath = mainCssPath;
  }

  //workbench.main.cssのコンテンツを取得するとかなり長い文字列
  //シェルっぽくファイル操作でやった方がよさげ
  //バックアップファイルが無ければ生成する（main.css.backup）

  /**
   * Generate workbench.main.css.backup
   * if there are no backup files.
   */
  generateBackup() {
    const backupName = this.mainCssPath + '.backup';
    if (fs.existsSync(backupName)) {
      fs.copyFileSync(this.mainCssPath, backupName, fs.constants.COPYFILE_EXCL);
    }
  }

  getCssContent(): string {
    return "";
  }
  
  addCssContent(): string {
    return "";
  }
  
  resetCssContent() {
    const exec = cp.exec;




    let content = this.getCssContent();
    const reg = new RegExp(`\\/\\*ext-${this.extName}-start\\*\\/[\\s\\S]*?\\/\\*ext-${this.extName}-end\\*\\/`,'g');
    content = content.replace(reg, '');
    content = content.replace(/\s*$/, '');
  }
}
