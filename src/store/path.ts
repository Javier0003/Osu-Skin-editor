import { create } from 'zustand'

type FP = {
  path: string
  GetPath: (val: string) => void
}

export const FilePath = create<FP>((set) => ({
  path: '',
  GetPath: (val) => {
    set({ path: val })
  }
}))
