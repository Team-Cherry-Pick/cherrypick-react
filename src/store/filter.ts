import { atom } from 'jotai';

export const filterAtom = atom({
    soldOut: false,
    freeShipping: true,
    overseas: false,
});

export type FilterKey = keyof typeof filterAtom['init'];
