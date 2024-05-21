import { create } from 'zustand'

type FP = {
  path: string
  GetPath: (val: string) => void
}

export const FilePath = create<FP>((set) => ({
  path: "C:\\Users\\javie\\AppData\\Local\\osu!\\/skins\\whypan",
  GetPath: (val) => {
    set({ path: val })
  }
}))
