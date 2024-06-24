import { Link } from 'react-router-dom'
import { assetState, setValues } from '../../../../store/local-or-skin'
import { sessionFilePath } from '../../../../store/session-paths'
import nameFolder from '../../../../utils/name'

const LeftPannel = (): JSX.Element => {
  const { setAsset, asset, local } = assetState((state) => state)
  const { sessionPath, fetchLocalOnly } = sessionFilePath((state) => state)

  const handleClick = (val: setValues) => setAsset(val)

  const handleAssets = async () => {
    await nameFolder(sessionPath, asset)
    fetchLocalOnly()
  }

  const handleLocal =() => setAsset()
  
  return (
    <div className="bg-slate-950 flex w-2/12 p-2 pt-16 flex-col justify-between">
      <div className="flex flex-col gap-4">
        <Link to={'/path'}>
          <button className="w-full">Select Skin</button>
        </Link>
        {local && (
          <button className="w-full" onClick={handleAssets}>
            Save Set
          </button>
        )}
      </div>

      <section className="flex flex-col gap-9">
        <section>
          <label htmlFor="">Selected skin Assets</label>
          <div className="flex w-full justify-between gap-1">
            <button
              className="bg-slate-800"
              onClick={() => {
                handleClick('circles')
              }}
            >
              Circle
            </button>
            <button
              className="bg-slate-800"
              onClick={() => {
                handleClick('cursor')
              }}
            >
              Cursor
            </button>
          </div>
        </section>

        <button className='w-full bg-slate-800' onClick={handleLocal}>Your Assets</button>
      </section>
    </div>
  )
}

export default LeftPannel
