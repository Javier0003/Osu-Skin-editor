import { FileEntry } from '@tauri-apps/api/fs'
import { convertFileSrc } from '@tauri-apps/api/tauri'

type ImgProps = {
  val: FileEntry
  i: number
}
export default function ImgComp({ val, i }: ImgProps) {
  const assetUrl = convertFileSrc(val.path)
  return (
    <div
      className="max-w-2/12 max-h-40 w-2/12 h-40 flex flex-col rounded-md bg-zinc-800"
      key={`container_${i}`}
    >
      <img src={assetUrl} key={`img_${i}`} className="max-w-2/12 max-h-40" />
      {val.name}
    </div>
  )
}
