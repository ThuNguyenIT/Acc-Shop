import { create } from 'zustand';
import { persist } from 'zustand/middleware';



export type LayoutState = {
    fontSize: number;
    textColor: string;
    fontFamily: string;
};
export type LayoutActions = {
    setFontSize: (font: number) => void;
    setTextColor: (color: string) => void;
    setFontFamily: (font: string) => void;
};
export const useLayoutStore = create<LayoutState & LayoutActions>()(
    (set, get) => ({
        fontSize: 20,
        textColor: get()?.textColor || '#000000',
        fontFamily: 'Roboto',
        setFontSize: (font: number) => {
            set({ fontSize: font });
        },
        setTextColor: (color: string) => {
            set({ textColor: color });
        },
        setFontFamily: (font: string) => {
            set({ fontFamily: font });
        },
    })
);