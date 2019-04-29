import * as vscode from 'vscode';
import * as path from 'path';
import MainCssController from './MainCssController';

export function activate(context: vscode.ExtensionContext) {
  if (require.main){
    const base = path.dirname(require.main.filename);
    const filePath = path.join(base, 'vs', 'workbench', 'workbench.main.css');

    console.log(base);
    console.log(filePath);

    const controller = MainCssController.getInstance('sushi-buffet', filePath);
    controller.addCssContent('akami');
  }
  
  //at orderd Sushi
  const order = vscode.commands.registerCommand("extension.order", () => {
    //Inflate QuickPick
  });
  context.subscriptions.push(order);

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

  const textChanged = vscode.workspace.onDidChangeTextDocument((e) => {
    //e.contentChanges
    const last = e.contentChanges.length;
    if(last > 0){
      console.log(e.contentChanges[last-1]);
      console.log("* * *");
    }
  });
  context.subscriptions.push(textChanged);
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
