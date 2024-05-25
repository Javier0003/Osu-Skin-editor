import { FileEntry, readDir } from '@tauri-apps/api/fs'
import { create } from 'zustand'

type SessPaths = {
  sessionPath: FileEntry[]
  getSessionPaths: (val: FileEntry[]) => void
  fetchData: (
    selectedPath: string
  ) => void
}

export const sessionFilePath = create<SessPaths>((set) => ({
  sessionPath: [],
  getSessionPaths: (val) => {
    set({ sessionPath: val })
  },
  fetchData: async (selectedPath) => {
    try {
      const compList = await readDir(selectedPath)
      set({ sessionPath: compList })
    } catch (error) {}
  }
}))
