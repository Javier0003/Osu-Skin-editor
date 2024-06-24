import { create } from "zustand";

export type setValues = 'cursor' | 'circles'

type AssetProps = {
  asset: setValues
  local: boolean
  setAsset: (asset?: setValues) => void
  setDefault: () => void
}

export const assetState = create<AssetProps>((set) => ({
  asset: 'cursor',
  local: true,
  setAsset: (asset) =>{
    const local = saveToggle(asset) 
    set({ asset: asset, local: local })
  },
  setDefault: () => set({ asset: 'cursor', local: true })
}))

const saveToggle = (asset?:string): boolean => {
  if(asset === 'cursor' || asset === 'circles') return true
  
  return false
}