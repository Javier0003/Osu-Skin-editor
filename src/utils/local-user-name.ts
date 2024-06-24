import { appLocalDataDir } from '@tauri-apps/api/path'

export default async function getLocalUser(){
  const userName = await appLocalDataDir()
  const user = userName.split('\\')[2]

  return user
}