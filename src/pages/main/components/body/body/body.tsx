import { sessionFilePath } from '../../../../../store/session-paths'
import { useEffect, useState } from 'react'
import { FilePath } from '../../../../../store/path'
import { assetState } from '../../../../../store/local-or-skin'
import ModalComp from './components/modal'
import ImgComp from './components/image'
import LocalImg from './components/local-img'

type Modal = {
  path: string
  asset: string
  name: string
} | null

const Body = (): JSX.Element => {
  const [modal, setModal] = useState<Modal>()
  const { sessionPath, fetchData } = sessionFilePath((state) => state)
  const { asset, local } = assetState((state) => state)
  const { path } = FilePath((state) => state)
  const [rr, srr] = useState<boolean>(true)

  useEffect(() => {
    fetchData(path)
  }, [path, rr])

  return (
    <div className="flex place-content-center pt-20 pl-4 pr-4 flex-wrap gap-1">
      {modal && (
        <ModalComp
          path={modal.path}
          asset={modal.asset}
          name={modal.name}
          close={setModal}
          renderer={srr}
        />
      )}

      {local &&
        sessionPath[asset].map((val, index) => {
          const format = val.path.split('.').pop()
          if (format !== 'png') return null

          return (
            <ImgComp val={val} i={index} key={`comp_${index}`} set={setModal} />
          )
        })}

      {!local &&
        sessionPath['local'].map(({ name, test }, index) => (
          <LocalImg
            key={`comp_${index}`}
            i={index}
            set={name}
            renderer={srr}
            filesPaths={test}
          />
        ))}
    </div>
  )
}

export default Body
