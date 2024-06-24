import { BaseDirectory, createDir, readDir } from '@tauri-apps/api/fs'
import { appDataDir } from '@tauri-apps/api/path'
import copyAssets from './copy-assets'
import { Sessions } from '../store/session-paths'
import { setValues } from '../store/local-or-skin'

const nameFolder = async (
  sessionPath: Sessions,
  asset: setValues,
  setName?: string
): Promise<void> => {
  try {
    const oldSets = (
      await readDir(`Assets`, { dir: BaseDirectory.AppConfig })
    ).map((val) => {
      if (val.children) return val.name
    })

    const folders = oldSets.filter((val) => val !== undefined)

    if (!setName || folders.filter((val) => val === setName).length !== 0) {
      const lastSet = folders[folders.length - 1]
      if (lastSet) {
        setName = createName(lastSet)
      } else {
        setName = 'Set 1'
      }
    }

    await createDir(`Assets\\${setName}`, { dir: BaseDirectory.AppConfig })
    const path = await appDataDir()

    sessionPath[asset].map((val: { path: string }) => {
      copyAssets(val.path, `${path}\\Assets\\${setName}`)
    })
  } catch (error) {
    console.log(error)
  }
}

export default nameFolder

function createName(lastSet: string) {
  const lastSetNumber = Number(lastSet.split(' ')[1])

  return `Set ${lastSetNumber + 1}`
}
