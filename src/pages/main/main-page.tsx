import Body from './components/body/body'
import LeftPannel from './components/left-pannel/left-pannel'
import Top from './components/top-panel/top-panel'

function App(): JSX.Element {
  return (
    <div className="flex h-full justify-between">
      <div className="flex w-full flex-col">
        <Top />
        <Body />
      </div>
      <LeftPannel />
    </div>
  )
}

export default App
