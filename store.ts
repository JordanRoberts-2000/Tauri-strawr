import { create } from "zustand"

interface Store{
    selectedId: number,
    fileInputActive: boolean,
    fileInputFolder: boolean,
    tabs: number[]
}

export const useStore = create<Store>()((set) => ({
    selectedId: 0,
    fileInputActive: false,
    fileInputFolder: false,
    tabs: []
}))