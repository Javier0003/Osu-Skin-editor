import {
  BaseDirectory,
  FileEntry,
  readDir,
  writeTextFile
} from '@tauri-apps/api/fs'
import { useEffect, useMemo, useState } from 'react'
import { FilePath } from '../../store/path'
import { Link } from 'react-router-dom'
import { sessionFilePath } from '../../store/session-paths'
import getLocalUser from '../../utils/local-user-name'
import { assetState } from '../../store/local-or-skin'

const fetchFolders = async (): Promise<FileEntry[]> => {
  const user = await getLocalUser()
  const result = await readDir(
    `C:\\Users\\${user}\\AppData\\Local\\osu!\\Skins`
  )
  return result
}

const Path = () => {
  const { GetPath, config } = FilePath((state) => state)
  const [ allSkins, setSkins ] = useState<FileEntry[]>([])
  const { fetchData } = sessionFilePath((state) => state)
  const [ search, setSearch ] = useState('')
  const { setDefault } = assetState((state) => state)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
  
  const filteredSkins = useMemo(() => {
    const filteredCards = []
    for (let i = 0; i < allSkins.length; i++) {
      const skin = allSkins[i]

      //@ts-expect-error typescript doesn't know that skin.name is a defined (I don't think you can have files without name)
      if (skin.name.toLowerCase().includes(search.toLowerCase())) {
        filteredCards.push(skin)
      }
    }
    return filteredCards
  },[allSkins, search])

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
    fetchData(skinData.path)
  }

  return (
    <div className="p-3">
      <div className="flex justify-between p-2">
        <h1>Select Skin</h1>
        <Link to={'/'}>
          <button onClick={setDefault}>Return</button>
        </Link>
      </div>
      <input type="text" onChange={handleChange} value={search}/>
      <div className="flex gap-2 flex-wrap pt-4">
        {filteredSkins &&
          filteredSkins.map((val, index) => {
            if (!val.children) return
            return (
              <Link to={'/'} key={`link_${index}`} className="">
                <button
                  key={`button_${index}`}
                  className=""
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
