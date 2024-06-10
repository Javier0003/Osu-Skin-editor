import {
  BaseDirectory,
  createDir,
  readDir,
  readTextFile,
  writeTextFile
} from '@tauri-apps/api/fs'
import { appLocalDataDir } from '@tauri-apps/api/path'
import { create } from 'zustand'

type FP = {
  path: string
  config: Config
  GetPath: (val: string) => void
  CheckDefault: () => void
  editFile: (osuPath: string, persistS: boolean) => void
}

type Config = {
  persist: boolean
  DefaultOsuPath: string
} | null

export const FilePath = create<FP>((set) => ({
  path: '',
  config: null,
  GetPath: (val) => {
    set({ path: val })
  },
  CheckDefault: async () => {
    try {
      await readDir('', { dir: BaseDirectory.AppConfig })

      const defaultPath = await readTextFile('app.conf', {
        dir: BaseDirectory.AppConfig
      })
      const obj = JSON.parse(defaultPath)

      if (obj.PersistSkinPath) {
        const persistedSkin = await readTextFile('skin.conf', {
          dir: BaseDirectory.AppConfig
        })
        set({ path: persistedSkin })
      }

      set({
        config: {
          persist: obj.PersistSkinPath,
          DefaultOsuPath: obj.DefaultOsuPath
        }
      })
    } catch (error) {
      const textTemplate = await configFileTemplate()
      await createDir('', { dir: BaseDirectory.AppConfig })
      await createDir('Assets', { dir: BaseDirectory.AppConfig })
      await writeTextFile('app.conf', textTemplate, {
        dir: BaseDirectory.AppConfig
      })
      await writeTextFile('skin.conf', '', {
        dir: BaseDirectory.AppConfig
      })
    }
  },
  editFile: async (osuPath, persistS) => {
    const newFile = JSON.stringify({
      PersistSkinPath: persistS,
      DefaultOsuPath: osuPath
    })
    await writeTextFile('app.conf', newFile, {
      dir: BaseDirectory.AppConfig
    })
  }
}))

async function configFileTemplate() {
  const userName = await appLocalDataDir()
  const user = userName.split('\\')[2]
  return JSON.stringify({
    PersistSkinPath: true,
    DefaultOsuPath: `C:\\Users\\${user}\\AppData\\Local\\osu!\\Skins`
  })
}
