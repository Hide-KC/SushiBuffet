import * as vscode from 'vscode';
import * as cssUtils from './util/CssUtils';
import { MainCssManager } from './MainCssManager';
import { SushiMoveFactory } from './move/SushiMoveFactory';
import { MoveTypeEnum, Factory } from './move/Factory';
import { SushiMove } from './move/SushiMove';

export function activate() {
  // 設定値を取得
  const prefs = vscode.workspace.getConfiguration("SushiBuffetPreferences")
  const enable = prefs.get<boolean|undefined>('enable')
  
  // Cssを操作するManagerを生成
  const manager = new MainCssManager()
  const factory: Factory<SushiMove> = new SushiMoveFactory()
  manager.setSushiMove(factory.create(MoveTypeEnum.KAITEN))

  const filePath = cssUtils.getMainCssPath()
  console.log(filePath);

  if (filePath && enable){
    manager.addContent()
  }

  //configuration changed
  vscode.workspace.onDidChangeConfiguration(listener => {
    //Sushi buffet でなければ return
    if (!listener.affectsConfiguration("SushiBuffetPreferences")) return

    //workbench.main.cssパスがnullだったらreturn
    if (!filePath) {
      console.error("Can't get workbench.main.css Path.")
      return
    }
    
    //prefsの再呼び出しは冗長かも？
    const prefs = vscode.workspace.getConfiguration("SushiBuffetPreferences")
    const enable = prefs.get<boolean|undefined>('enable')
    const opacity = prefs.get<number|undefined>('opacity')

    console.log("Prefs.enable: " + enable)
    console.log("Prefs.opacity: " + opacity)

    if (!enable) {
      manager.removeContent()
    } else if (opacity) {
      manager.addContent()
    }
  })
}

export function deactivate() {
  const ext = vscode.extensions.getExtension('kcpoipoi.sushi-buffet')
  console.log(ext!.isActive)
  
  const prefs = vscode.workspace.getConfiguration("SushiBuffetPreferences");
  const enable = prefs.get<boolean|undefined>('enable');

  if (require.main && ext && (enable === false || !ext.isActive)){
    prefs.update('enable', false)
    const manager = new MainCssManager()
    manager.removeContent()
  }
}
