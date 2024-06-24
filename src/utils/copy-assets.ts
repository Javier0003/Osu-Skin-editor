import { copyFile } from '@tauri-apps/api/fs'

async function copyAssets(copyPath: string, savePath: string): Promise<void> {
  try {
    const name = copyPath.split('\\')

    await copyFile(copyPath, `${savePath}\\${name[name.length - 1]}`)
  } catch (error) {
    console.log(error)
  }
}

export default copyAssets
