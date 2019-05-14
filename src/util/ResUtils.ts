import * as fs from 'fs';
import * as path from 'path';

/**
 * リソースフォルダの絶対パスを返す
 */
export function getResPath(): string {
  return path.join(__dirname.substring(0, __dirname.length - 4), 'res');
}

/**
 * すべてのリソースファイルの絶対パスを配列で返す
 */
export function getResPngUris(): string[]{
  const resPath = getResPath()
  const pngs = fs.readdirSync(resPath)

  for (let i = 0; i < pngs.length; i++){
    pngs[i] = path.join(resPath, pngs[i]).replace(/\\/g, '\\\\\\\\\\\\\\\\');
  }
  
  return pngs
}