import * as fs from 'fs';
import * as path from 'path';

/**
 * リソースフォルダの絶対パスを返す
 */
export function getResPath(): string {
  // TODO 9文字削って相対参照はやばい
  return path.join(__dirname.substring(0, __dirname.length - 9), 'res');
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