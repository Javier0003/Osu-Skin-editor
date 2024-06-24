import { removeFile } from '@tauri-apps/api/fs'
import { FilePath } from '../../../../../../store/path'

type Modal = {
  path: string
  asset: string
  name: string
  close: (val: null) => void
  renderer: (v: boolean) => void
}

export default function ModalComp({ path, asset, name, close, renderer }: Modal) {
  const { CheckDefault } = FilePath((state) => state)

  const handleClose = () => close(null)
  

  const handleRemove = async () => {
    try {
      await removeFile(path)
      CheckDefault()
      //@ts-ignore
      renderer(v => !v)
      close(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-1/2 w-1/2 bg-zinc-800 flex flex-col place-items-center rounded-lg justify-between p-14 fixed border-black border">
      <img src={asset} className="max-h-40 max-w-40" />
      <h1>{name.split('.png')[0]}</h1>
      <div className="flex flex-row mt-5 justify-between w-full pl-14 pr-14">
        <button onClick={handleRemove} className="w-24 bg-red-500">
          Remove
        </button>
        <button onClick={handleClose} className="w-24">
          Close
        </button>
      </div>
    </div>
  )
}
