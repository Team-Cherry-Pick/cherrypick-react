import { atom } from 'jotai';

export type ThemeType = 'light' | 'dark';

export const themeAtom = atom<ThemeType>('light');
