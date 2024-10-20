import { create } from 'zustand';
import { persist } from 'zustand/middleware';



export type HomeState = {
    targetGender: Genders | null; // Khởi tạo với null cho đến khi người dùng chọn

};


export enum Genders {
    MALE = 'male',
    FEMALE = 'female',
}
const getInitialTargetGender = (): Genders | null => {
    if (typeof window !== 'undefined') {
        const savedGender = localStorage.getItem('targetGender');
        return savedGender ? (savedGender as Genders) : null;
    }
    return null;
};

const saveTargetGender = (gender: Genders | null) => {
    localStorage.setItem('targetGender', gender || '');
};

export type HomeActions = {
    setTargetGender: (gender: Genders) => void;
};

export const useHomeStore = create<HomeState & HomeActions>()(
    persist(
        (set) => ({
            targetGender: getInitialTargetGender(),
            setTargetGender: (gender: Genders) => {
                set({ targetGender: gender });
                saveTargetGender(gender);
            },
        }),
        { name: 'home-store', skipHydration: true, }
    )
);
