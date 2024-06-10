import ImgComp from './components/image'
import { sessionFilePath } from '../../../../store/sessionPaths'
import { useEffect, useState } from 'react'
import { FilePath } from '../../../../store/path'
import ModalComp from './components/modal'

type Modal = {
  path: string
  asset: string
  name: string
} | null

const Body = (): JSX.Element => {
  const [ modal, setModal ] = useState<Modal>()
  const { sessionPath, fetchData } = sessionFilePath((state) => state)
  const { path } = FilePath((state) => state)

  useEffect(() => {
    fetchData(path)
  }, [sessionPath])

  return (
    <div className="flex place-content-center pt-20 pl-4 pr-4 flex-wrap gap-1">
      {modal && (
        <ModalComp path={modal.path} asset={modal.asset} name={modal.name} close={setModal} />
      )}

      {sessionPath['cursor'].map((val, index) => {
        const format = val.path.split('.').pop()
        if (format !== 'png') return null
        
        return <ImgComp val={val} i={index} key={`comp_${index}`} set={setModal} />
      })}
    </div>
  )
}

export default Body
