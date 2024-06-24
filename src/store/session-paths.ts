import { BaseDirectory, FileEntry, readDir } from '@tauri-apps/api/fs'
import { create } from 'zustand'

export type Sessions = {
  cursor: FileEntry[]
  circles: FileEntry[]
  local: Test[]
}

type Test = {
  test: FileEntry[]
  name: string
}

type SessPaths = {
  sessionPath: Sessions
  fetchData: (selectedPath: string) => void
  fetchLocalOnly: ()=>void
}

export const sessionFilePath = create<SessPaths>((set) => ({
  sessionPath: {
    cursor: [],
    circles: [],
    local: []
  },
  fetchData: async (selectedPath) => {
    try {
      const local = await localAssets()
      const files = await skin(selectedPath)

      set({
        sessionPath: {
          cursor: files.cursor,
          circles: files.circles,
          local: local.local
        }
      })
    } catch (error) {
      console.log(error)
    }
  },
  fetchLocalOnly: async()=>{
    const local = await localAssets()

    set((prev) => ({
      sessionPath: {
        cursor: prev.sessionPath.cursor,
        circles: prev.sessionPath.circles,
        local: local.local
      }
    }))
  }
}))

const skin = async (selectedPath: string) => {
  const compList = await readDir(selectedPath)
  const circles = compList.filter((file) => {
    if (file.name?.includes('circle') && file.name?.includes('spinner')) return

    return file.name?.includes('circle')
  })

  const cursorFiles = compList.filter((file) => file.name?.startsWith('cursor'))
  return { cursor: cursorFiles, circles: circles }
}

const localAssets = async () => {
  const localComp = await readDir('Assets', {
    dir: BaseDirectory.AppConfig
  })

  const folders: Test[] = []

  localComp.map(async ({ children, path, name }) => {
    if (children) {
      const folder = await readDir(path)
      if (!name) return
      folders.push({ test: folder, name: name })
    }
  })

  return {
    local: folders
  }
}
