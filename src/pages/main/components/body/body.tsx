import ImgComp from './components/image'
import { sessionFilePath } from '../../../../store/sessionPaths'
import { useEffect } from 'react'
import { FilePath } from '../../../../store/path'

const Body = (): JSX.Element => {
  const { sessionPath, fetchData } = sessionFilePath((state) => state)
  const { path } = FilePath((state) => state)

  useEffect(() =>{
    fetchData(path)
  }, [])

  return (
    <div className="flex place-content-center pt-20 pl-4 pr-4 flex-wrap gap-1">
      {sessionPath.map((val, index) => {
        const format = val.path.split('.').pop()
        if (format === 'png') return <ImgComp val={val} i={index} key={`comp_${index}`}/>
        
        // if (format === 'ogg')
        //   return (
        //     <div className="w-2/12 h-40" key={`container_${index}`}>
        //       <img src={assetUrl} alt="" key={`img_${index}`} />
        //       {val.name}
        //     </div>
        //   )
        return null
      })}
    </div>
  )
}

export default Body
