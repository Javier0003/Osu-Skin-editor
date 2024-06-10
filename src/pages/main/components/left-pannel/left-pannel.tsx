import { assetState } from '../../../../store/localOrSkin'
import Button from './components/button'
type setValues = 'cursor' | 'circles' | 'localCursors' | 'localCircles'

const LeftPannel = (): JSX.Element => {
  const { setAsset } = assetState((state) => state)

  const handleClick = (val: setValues) => setAsset(val)
  
  return (
    <div className="bg-slate-950 flex w-2/12 p-2 pt-16 flex-col justify-between">
      <Button>Select Path</Button>

      <section className='flex flex-col gap-9'>
        <div>
          <label htmlFor="">Skin Assets</label>
          <div className="flex w-full justify-between gap-1">
            <button className="bg-slate-800">Circle</button>
            <button className="bg-slate-800">Cursor</button>
          </div>
        </div>

        <div>
          <label htmlFor="">Your Assets</label>
          <div className="flex w-full justify-between gap-1">
            <button className="bg-slate-800">Circle</button>
            <button className="bg-slate-800">Cursor</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LeftPannel
