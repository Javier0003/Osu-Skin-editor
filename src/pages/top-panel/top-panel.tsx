import { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FilePath } from '../../store/path'

const Top = (): JSX.Element => {
  const { CheckDefault } = FilePath((state) => state)

  useEffect(() => {
    CheckDefault()
  }, [])

  return (
    <>
      <div className="bg-slate-950 h-14 flex items-center gap-6 justify-between absolute w-full pl-3 pr-3">
        <h1 className="text-zinc-300">OSE</h1>
        <div className="w-44 flex justify-between">
          <Link to={'/config'}>
            <button className="bg-slate-900 text-cyan-100">config</button>
          </Link>
          <Link to={'/'}>
            <button className="bg-slate-900 text-cyan-100">app</button>
          </Link>
        </div>
      </div>
      <div className="h-full w-full">
        <Outlet />
      </div>
    </>
  )
}

export default Top
