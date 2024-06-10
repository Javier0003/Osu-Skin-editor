import { FileEntry, readDir } from '@tauri-apps/api/fs'
import { create } from 'zustand'

type Sessions = {
  cursor: FileEntry[]
  circles: FileEntry[]
  // localCursors: FileEntry[]
  // localCircles: FileEntry[]
}

type SessPaths = {
  sessionPath: Sessions
  fetchData: (selectedPath: string) => void
}

export const sessionFilePath = create<SessPaths>((set) => ({
  sessionPath: {
    cursor: [],
    circles: [],
    // localCursors: [],
    // localCircles: []
  },
  fetchData: async (selectedPath) => {
    try {
      const compList = await readDir(selectedPath)
      const circles = compList.filter((file) => {
        if (file.name?.includes('circle') && file.name?.includes('spinner'))
          return
        return file.name?.includes('circle')
      })

      const cursorFiles = compList.filter((file) =>
        file.name?.startsWith('cursor')
      )

      set({ sessionPath: { cursor: cursorFiles, circles: circles } })
    } catch (error) {}
  }
}))
