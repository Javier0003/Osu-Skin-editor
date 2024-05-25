import {
  BaseDirectory,
  FileEntry,
  readDir,
  writeTextFile
} from '@tauri-apps/api/fs'
import { appLocalDataDir } from '@tauri-apps/api/path'
import { useEffect, useState } from 'react'
import { FilePath } from '../../store/path'
import { Link } from 'react-router-dom'

const fetchFolders = async (): Promise<FileEntry[]> => {
  const userName = await appLocalDataDir()
  const user = userName.split('\\')[2]
  const result = await readDir(
    `C:\\Users\\${user}\\AppData\\Local\\osu!\\Skins`
  )
  return result
}

const Path = () => {
  const { GetPath, config } = FilePath((state) => state)
  const [allSkins, setSkins] = useState<FileEntry[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const skins = await fetchFolders()
      setSkins(skins)
    }
    fetchData()
  }, [])

  const handleSkin = async (skinData: FileEntry) => {
    if (config?.persist) {
      await writeTextFile('skin.conf', skinData.path, {
        dir: BaseDirectory.AppConfig
      })
    }
    GetPath(skinData.path)
  }

  return (
    <div className="">
      <div className="flex justify-between p-2">
        <h1>Select Skin</h1>
        <Link to={'/app'}>
          <button>Return</button>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {allSkins &&
          allSkins.map((val, index) => {
            if (!val.children) return
            return (
              <Link to={'/app'} key={`link_${index}`}>
                <button
                  key={`button_${index}`}
                  className="w-4/6 ml-7"
                  onClick={() => handleSkin(val)}
                >
                  {val.name}
                </button>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

export default Path
