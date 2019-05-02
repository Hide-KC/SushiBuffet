import * as vscode from 'vscode';
import * as path from 'path';
import MainCssController from './MainCssController';

export function activate(context: vscode.ExtensionContext) {
  const prefs = vscode.workspace.getConfiguration("SushiBuffetPreferences")
  const enable = prefs.get<boolean|undefined>('enable')

  if (require.main && enable){
    const base = path.dirname(require.main.filename);
    const filePath = path.join(base, 'vs', 'workbench', 'workbench.main.css');

    console.log(base);
    console.log(filePath);

    const controller = MainCssController.getInstance('sushi-buffet', filePath);
    controller.generateBackup();
    controller.addCssContent();
  }

  //reset cover
  const reset = vscode.commands.registerCommand("extension.reset", () => {
    if (require.main){
      const base = path.dirname(require.main.filename);
      const filePath = path.join(base, 'vs', 'workbench', 'workbench.main.css');  
      const controller = MainCssController.getInstance('sushi-buffet', filePath);
      controller.resetCssContent();
    }
  })
  context.subscriptions.push(reset);
}

export function deactivate() {
  console.log('deactivate');
  if (require.main){
    const base = path.dirname(require.main.filename);
    const filePath = path.join(base, 'vs', 'workbench', 'workbench.main.css');

    const controller = MainCssController.getInstance('sushi-buffet', filePath);
    controller.resetCssContent();
  }
}
