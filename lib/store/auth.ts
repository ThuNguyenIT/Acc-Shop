import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { IUser } from "@/types";

export type AuthState = {
  user: IUser | null;
};

export type AuthActions = {
  setUser: (user: IUser) => void;
  logout: () => void;
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist<AuthStore>(
    (set) => ({
      user: null,
      setUser: (user: IUser) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-store",
    } as PersistOptions<AuthStore>
  )
);
