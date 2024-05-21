import { useEffect, useState } from 'react'
import { FilePath } from '../../../../store/path'
import { FileEntry, readDir } from '@tauri-apps/api/fs'
import { convertFileSrc } from '@tauri-apps/api/tauri'

type defImg = {
  file: FileEntry[]
  img: string
}

const Body = (): JSX.Element => {
  const [comps, setComps] = useState<FileEntry[]>([])
  const xd2 = FilePath((state) => state.path)
  const xd = false
  const handleClick = (): void => {
    console.log(xd2)
    console.log(comps)
  }
  useEffect(() => {
    const fetchData = async () => {
      const compList = await readDir(xd2)

      setComps(compList)

    }

    fetchData()

  }, [])

  return (
    <div className="flex place-content-center pt-20 pl-4 pr-4">
      {!xd && (
        <div className="">
          <button className="" onClick={handleClick}>
            {'xd'}
          </button>
        </div>
      )}

      <div className="flex flex-col border w-2/12">
        <img src="" alt="" />
      </div>
    </div>
  )
}

export default Body
