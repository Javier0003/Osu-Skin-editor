import { Link } from 'react-router-dom'
import { FilePath } from '../../../../../store/path'

const Button = ({ children }: { children: string }): JSX.Element => {
  const setPath = FilePath(state => state.GetPath)
  
  const handlePath = (e: React.MouseEvent<HTMLInputElement>) => {

  }
  
  return (
    <div className="border border-white h-10 text-center relative">
      <Link to={'/path'}>
      <label htmlFor="inputPath" className="text-white w-full h-full absolute select-none">
        {children}
      </label>
      <input
        type="button"
        id="inputPath"
        className="opacity-0 w-full h-10 relative "
        // directory=""
        // webkitdirectory=""
        onClick={handlePath}
      />
      </Link>
    </div>
  )
}

export default Button
