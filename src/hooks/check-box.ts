import { useState } from 'react'

type Check = [boolean, () => void]

function useChecked(dV = false): Check{
  const [value, setChecked] = useState(dV)
  const setValue = () => setChecked(!value)
  return [value, setValue]
}

export default useChecked