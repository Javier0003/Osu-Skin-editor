import { FileEntry, readDir } from '@tauri-apps/api/fs'
import { appLocalDataDir } from '@tauri-apps/api/path'
import { useEffect, useState } from 'react'
import { FilePath } from '../../store/path'
import { Link } from 'react-router-dom'

const fetchFolders = async () => {
  const app = await appLocalDataDir()
  const result = await readDir(`${app}/skins`)
  return result
}

const Path = () => {
  const getSkinPath = FilePath((state) => state.GetPath)
  const [allSkins, setSkins] = useState<FileEntry[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const skins = await fetchFolders()
      setSkins(skins)
    }
    fetchData()
  }, [])

  const handleSkin = (skinData: FileEntry) => {
    getSkinPath(skinData.path)
  }

  return (
    <div className="">
      <div>Default Skin path</div>
      <div className="flex flex-col gap-2">
        {allSkins &&
          allSkins.map((val, index) => (
            <Link to={'/app'} key={`link_${index}`}>
              <button
                key={`button_${index}`}
                className="w-4/6 ml-7"
                onClick={() => handleSkin(val)}
              >
                {val.name}
              </button>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default Path
