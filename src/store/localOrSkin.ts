import { create } from "zustand";

type setValues = 'cursor' | 'circles' | 'localCursors' | 'localCircles'

type AssetProps = {
  asset: string
  setAsset: (asset: setValues) => void
}

export const assetState = create<AssetProps>((set) => ({
  asset: '',
  setAsset: (asset: string) => set({ asset }),
}))
