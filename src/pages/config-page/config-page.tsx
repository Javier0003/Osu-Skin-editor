import { ChangeEvent, useEffect, useState } from 'react'
import { FilePath } from '../../store/path'
import useChecked from '../../hooks/check-box'

export default function ConfigPage() {
  const [osuPath, setOsuPath] = useState<string>('')
  const { editFile, config, CheckDefault } = FilePath((state) => state)
  const [persist, setPersist] = useChecked(config?.persist || false)

  useEffect(() => {
    const asyncEffect = async () => {
      if (!config) return
      setOsuPath(config.DefaultOsuPath)
    }
    asyncEffect()
  }, [])

  const handleClick = () => {
    if (!config) return
    CheckDefault()
    editFile(osuPath, persist)
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

      <div className="flex flex-row gap-3">
        <label htmlFor="">Persist Skin</label>
        <input type="checkbox" onChange={setPersist} checked={persist} />
      </div>
      <button className="absolute right-20 bottom-20" onClick={handleClick}>
        Save
      </button>
    </div>
  )
}
