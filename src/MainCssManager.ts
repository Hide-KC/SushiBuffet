import * as fs from 'fs';
import * as path from 'path';
import * as cssUtils from './util/CssUtils';

export class MainCssManager {
  private readonly mainCssPath = cssUtils.getMainCssPath()
  private readonly backupPath: string = cssUtils.getMainCssPath() + 'workbench.main.css.backup'
  
  addContent() {

  }

  removeContent() {

  }

  /**
  * Create workbench.main.css.backup
  * if there are no backup files.
  */
 private createBackup() {
   if (!fs.existsSync(this.backupPath) && this.mainCssPath) {
     fs.copyFileSync(this.mainCssPath, this.backupPath, fs.constants.COPYFILE_EXCL);
   }
 }
}