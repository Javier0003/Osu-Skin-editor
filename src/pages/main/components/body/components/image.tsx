import { FileEntry } from '@tauri-apps/api/fs'
import { convertFileSrc } from '@tauri-apps/api/tauri'

type Modal = {
  path: string
  asset: string
  name: string
} | null

type ImgProps = {
  val: FileEntry
  i: number
  set: (val: Modal) => void
}

export default function ImgComp({ val, i, set }: ImgProps) {
  const assetUrl = convertFileSrc(val.path)

  const handleClick = () =>{
    if(!val.name) return

    set({
      path: val.path,
      asset: assetUrl,
      name: val.name
    })
  }

  return (
    <div
      className="max-w-2/12 w-2/12 flex flex-col rounded-md bg-zinc-800 p-1"
      key={`container_${i}`} onClick={handleClick}
    >
      <img src={assetUrl} key={`img_${i}`} className="max-w-2/12 max-h-40" />
      <label htmlFor="">{val.name?.split(".png")[0]}</label>
    </div>
  )
}
