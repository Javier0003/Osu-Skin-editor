import { BaseDirectory, readDir } from '@tauri-apps/api/fs'

const Path = () => {
  const handleClick = async () => {
    // const appDataMade = BaseDirectory.AppData
    // const app = await desktopDir()
    const result = await readDir('users', {dir: BaseDirectory.AppData, recursive: true})
    // console.log(result)
    // console.log(await appDataDir())
  }

  return (
    <div className="">
      <button
        className="border-0 shadow-none text-white bg-zinc-900"
        onClick={handleClick}
      >
        XD
      </button>
      <input type="file" />
    </div>
  )
}

export default Path
