import { create } from 'zustand'

export const useHomeStore = create((set) => ({
    activeComponent: 'Hizmet Al',
    setActiveComponent: (componentName) => set(() => ({ activeComponent: componentName }))
}))
