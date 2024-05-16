const Body = (): JSX.Element => {
  const xd = false
  const handleClick = (): void => {}


  return (
    <div className="w-full flex place-content-center m-4">
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
