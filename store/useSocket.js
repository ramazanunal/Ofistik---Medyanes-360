'use client'
import { create } from 'zustand'

export const useSocket = create((set) => ({
    socket: null,
    setSocket: (newSocket) => set(() => ({ socket: newSocket }))
}))
