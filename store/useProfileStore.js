import { create } from 'zustand'

export const useProfileStore = create((set) => ({
    openPageId: null,
    openCommentPage: null,
    openFullCaption: undefined,
    openAddPost: false,
    posts: [],
    users: [],
    setOpenpageId: (index) => set(() => ({ openPageId: index })),
    setOpenCommentPage: (index) => set(() => ({ openModal: index })),
    setOpenFullCaption: () => set(() => ({ openModal: false })),
    setOpenAddPost: (bool) => set(() => ({ openAddPost: bool })),
    setPosts: (posts) => set(() => ({ posts: posts })),
    setUsers: (users) => set(() => ({ users: users })),
}))
