const Body = (): JSX.Element => {
  const xd = false
  const handleClick = (): void => {}


  return (
    <div className="flex place-content-center pt-20 pl-4 pr-4">
      {!xd && (
        <div className="">
          <button className="" onClick={handleClick}>
            {'xd'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Body
