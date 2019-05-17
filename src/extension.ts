import * as vscode from 'vscode';
import * as path from 'path';
import MainCssController from './MainCssController';

export function activate(context: vscode.ExtensionContext) {
  const prefs = vscode.workspace.getConfiguration("SushiBuffetPreferences")
  const enable = prefs.get<boolean|undefined>('enable')

  const filePath = getMainCssPath()
  console.log(filePath);

  if (filePath !== "" && enable){
    const controller = MainCssController.getInstance('sushi-buffet', filePath);
    controller.generateBackup();
    controller.addCssContent();
  }

  //configuration changed
  vscode.workspace.onDidChangeConfiguration(listener => {
    //Sushi buffet でなければ return
    if (!listener.affectsConfiguration("SushiBuffetPreferences")) return

    const filePath = getMainCssPath()

    //workbench.main.cssパスが取得できなかったらreturn
    if (filePath === "") {
      console.error("Can't get workbench.main.css Path.")
      return
    }
    
    const prefs = vscode.workspace.getConfiguration("SushiBuffetPreferences")
    const enable = prefs.get<boolean|undefined>('enable')
    const opacity = prefs.get<number|undefined>('opacity')

    console.log("Prefs.enable: " + enable)
    console.log("Prefs.opacity: " + opacity)

    const controller = MainCssController.getInstance('sushi-buffet', filePath)

    if (!enable) {
      controller.resetCssContent()
    } else if (opacity) {
      controller.addCssContent()
    }
  })
}

function getMainCssPath(): string {
  if (require.main){
    const base = path.dirname(require.main.filename);
    return path.join(base, 'vs', 'workbench', 'workbench.main.css');  
  }
  return ""
}

export function deactivate() {
  const ext = vscode.extensions.getExtension('kcpoipoi.sushi-buffet')
  console.log(ext!.isActive)
  
  const prefs = vscode.workspace.getConfiguration("SushiBuffetPreferences");
  const enable = prefs.get<boolean|undefined>('enable');

  if (require.main && ext && (enable === false || !ext.isActive)){
    const base = path.dirname(require.main.filename);
    const filePath = path.join(base, 'vs', 'workbench', 'workbench.main.css');
    const controller = MainCssController.getInstance('sushi-buffet', filePath);
    
    prefs.update('enable', false)
    controller.resetCssContent()
  }
}
