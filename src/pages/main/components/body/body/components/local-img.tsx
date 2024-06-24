import { FileEntry } from '@tauri-apps/api/fs'
import { convertFileSrc } from '@tauri-apps/api/tauri'

type LocalImgProps = {
  i: number
  set: string
  filesPaths: FileEntry[]
  renderer: (v: boolean) => void
}

const LocalImg = ({i, filesPaths, set} :LocalImgProps) => {
  const img = convertFileSrc(filesPaths[0].path)
  return (
    <div
      className="max-w-2/12 w-2/12 flex flex-col rounded-md bg-zinc-800 p-1"
      key={`container_${i}`}
    >
      {img && <img src={img} alt="" />}
      <label htmlFor="">{set}</label>
    </div>
  )
}


export default LocalImg