import { atomWithStorage } from 'jotai/utils';

export type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') {
        return 'light';
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
};

export const themeAtom = atomWithStorage<Theme>('theme', getInitialTheme());
