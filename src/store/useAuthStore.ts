import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    token: string | null;
    user: unknown | null;
    setToken: (token: string | null) => void;
    setUser: (user: unknown | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            preferences: null,
            setToken: (token) => set({ token }),
            setUser: (user) => set({ user }),
            logout: () =>
                set({
                    token: null,
                    user: null,
                }),
        }),
        {
            name: 'auth-storage',
        },
    ),
);
