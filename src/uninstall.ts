import MainCssController from "./MainCssController";
import { getMainCssPath } from "./util/CssUtils";
import * as vscode from 'vscode';

function onUninstalled() {
  const prefs = vscode.workspace.getConfiguration("SushiBuffetPreferences")
  prefs.update('enable', false)
  
  const mainCssPath = getMainCssPath()
  
  if (mainCssPath) {
    const controller = MainCssController.getInstance('sushi-buffet', mainCssPath)
    controller.resetCssContent()
  }
}

onUninstalled()