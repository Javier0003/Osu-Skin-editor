import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FilePath } from '../../store/path'

type Route = {
  route: string
  name: string
}

const Top = (): JSX.Element => {
  const { CheckDefault } = FilePath((state) => state)
  const [r, render] = useState<boolean>(true)
  const [ route, setRoute ] = useState<Route>({
    route: '',
    name: ''
  }) 
  const location = useLocation()

  const changeRoute = () =>{
    if(location.pathname === '/'){
      setRoute({
        route: '/config',
        name: 'configuration'
      })
    }
    if(location.pathname === '/config'){
      setRoute({
        route: '/',
        name: 'app'
      })
    }
  }

  useEffect(() => {
    CheckDefault()
    changeRoute()
  }, [r])

  return (
    <>
      <div className="bg-slate-950 h-14 flex items-center gap-6 justify-between absolute w-full pl-3 pr-3">
        <h1 className="text-zinc-300">OS!E</h1>
          <Link to={route.route}>
            <button className="bg-slate-900 text-cyan-100 w-44" onClick={() => render(v => !v)}>{route.name}</button>
          </Link>
      </div>
      <div className="h-full w-full">
        <Outlet />
      </div>
    </>
  )
}

export default Top
