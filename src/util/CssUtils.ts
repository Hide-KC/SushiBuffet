import * as path from 'path';

/**
 * workbench.main.css の絶対パスを返す
 */
export function getMainCssPath(): string | null {
  if (require.main){
    const base = path.dirname(require.main.filename);
    return path.join(base, 'vs', 'workbench', 'workbench.main.css');  
  }
  return null
}