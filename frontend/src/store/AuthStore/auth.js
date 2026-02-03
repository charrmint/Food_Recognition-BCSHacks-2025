import { create } from 'zustand'
import { api }from '@/api'

export const useAuthStore = create((set) => ({
    user: null,
    loadingUser: true,
    fetchMe: async () => {
        set({ loadingUser: true })
        try {
            const { data } = await api.get('/auth/me')
            set({ user: data, loadingUser: false })
        } catch {
            set({ user: null, loadingUser: false})
        }
    },
    login: async (email, password) => {
        await api.post('/auth/login', { email, password })
        await useAuthStore.getState().fetchMe()
    },
    signup: async (username, email, password) => {
        await api.post('auth/signup', { username, email, password })
    },
    logout: async () => {
        set({ user: null, loadingUser: false })
    },
})
)