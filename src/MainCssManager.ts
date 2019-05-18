import * as fs from 'fs';
import * as cssUtils from './util/CssUtils';
import * as cp from 'child_process';
import { SushiMove } from './move/SushiMove';
import * as vscode from 'vscode';

export class MainCssManager {
  private readonly extName = 'sushi-buffet'
  private readonly tagStart = `/\\*ext-${this.extName}-start\\*/`
  private readonly tagEnd = `/\\*ext-${this.extName}-end\\*/`
  private readonly mainCssPath: string | null = cssUtils.getMainCssPath()
  private readonly backupPath: string | null
  private sushiMove: SushiMove | null = null

  constructor() {
    if (this.mainCssPath) {
      this.backupPath = this.mainCssPath + '.backup'
      this.createBackup()
    } else {
      this.backupPath = null
    }
  }

  setSushiMove(move: SushiMove){
    this.sushiMove = move
  }
  
  addContent() {
    this.createBackup()
    if (this.mainCssPath && this.sushiMove){
      //削除する文字列を正規表現で指定
      const delContent = `${this.tagStart}.*${this.tagEnd}`
      
      //追加する文字列
      const content = this.sushiMove.getContent()
      
      //removeコマンドと連続で実行するとPermission deniedになるし、
      //コールバックの同期も必要なので、コマンド一発
      cp.exec(`sed -i -e "s|${delContent}||g" -e "$a ${content}" -e "/^[<space><tab>]*$/d" "${this.mainCssPath}"`, (err, stdout, stderr) => {
        if (err) {
          console.log("cp.err: " + err);
        } else {
          console.log("cp.stdout: " + stdout);
        }
      })
    }
  }

  removeContent() {
    //削除する文字列を正規表現で指定
    const delContent = `${this.tagStart}.*${this.tagEnd}`
    
    //sed で対象文字列を削除→空行を削除→最終行の改行コードを削除
    cp.exec(`sed -i -e "s|${delContent}||g" -e "/^[<space><tab>]*$/d" -e "/\\n$/d" -e "/\\r$/d" "${this.mainCssPath}"`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      } else {
        console.log(stdout);
      }
    })
  }

  /**
  * Create workbench.main.css.backup
  * if there are no backup files.
  */
  private createBackup() {
    if (this.mainCssPath && this.backupPath && !fs.existsSync(this.backupPath)) {
      try {
        fs.copyFileSync(this.mainCssPath, this.backupPath, fs.constants.COPYFILE_EXCL)
      } catch (e) {
        console.log(e)
        vscode.window.showErrorMessage('workbench.main.css が Program Files 配下にあると、この拡張機能は使えません。')
      }
    }
  }
}