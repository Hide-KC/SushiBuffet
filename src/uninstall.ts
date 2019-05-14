import MainCssController from "./MainCssController";
import * as path from 'path';
import { getMainCssPath } from "./util/CssUtils";

export default function onUninstalled() {
  const mainCssPath = getMainCssPath()
  
  if (mainCssPath) {
    const controller = MainCssController.getInstance('sushi-buffet', mainCssPath)
    controller.resetCssContent()
  }
}