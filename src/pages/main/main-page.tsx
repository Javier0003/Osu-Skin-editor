import Body from './components/body/body/body'
import LeftPannel from './components/body/left-pannel'

function App(): JSX.Element {
  return (
    <div className="flex h-full justify-between">
      <div className="flex w-full flex-col">
        <Body />
      </div>
      <LeftPannel />
    </div>
  )
}

export default App
