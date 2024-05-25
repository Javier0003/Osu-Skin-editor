import { ChangeEvent, useEffect, useState } from 'react'
import { FilePath } from '../../store/path'

export default function ConfigPage() {
  const [osuPath, setOsuPath] = useState<string>('')
  const [persistS, setPersist] = useState<boolean>(false)
  const { editFile, config, CheckDefault } = FilePath((state) => state)
  useEffect(() => {
    const asyncEffect = async () => {
      if (!config) return
      setOsuPath(config.DefaultOsuPath)
      setPersist(config.persist)
    }
    asyncEffect()
  }, [])

  const handleClick = () => {
    if (!config) return
    CheckDefault()
    editFile(osuPath, persistS)
  }

  return (
    <div className="container gap-5">
      <h1 className="text-left text-4xl">Configuration</h1>
      <div className="flex flex-col w-4/12">
        <label htmlFor="">Change default osu path</label>
        <input
          value={osuPath}
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOsuPath(e.target.value)
          }
        />
      </div>

      <div>
        <label htmlFor="">Persist Skin</label>
        <input
          type="checkbox"
          onChange={() => setPersist(!persistS)}
          checked={persistS}
        />
      </div>
      <button className="absolute right-20 bottom-20" onClick={handleClick}>
        Save
      </button>
    </div>
  )
}
