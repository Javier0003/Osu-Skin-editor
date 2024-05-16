const Button = ({ children }: { children: string }): JSX.Element => {
  const handlePath = (e): void => {
    console.log(e.target)
  }

  return (
    <div className="border border-white h-10 text-center relative">
      <label htmlFor="inputPath" className="text-white w-full h-full absolute select-none">
        {children}
      </label>
      <input
        type="file"
        id="inputPath"
        className="opacity-0 w-full h-10 relative "
        // directory=""
        // webkitdirectory=""
        onChange={handlePath}
      />
    </div>
  )
}

export default Button
