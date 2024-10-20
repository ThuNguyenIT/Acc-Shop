import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';


export type AuthState = {
    user: User | null;

};
export type AuthActions = {
    setUser: (user: User) => void;
    logout: () => void;
};
export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user: User) => {
                set({ user });
            },
            logout: () => {
                set({ user: null });
            }
        }),
        { name: 'auth-store' }
    )
);