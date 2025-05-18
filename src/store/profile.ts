// store/deals.ts
import { Gender, Profile } from '@/types/Profile';
import { atom } from 'jotai';

export const newProfileAtom = atom<Profile>({ nickname: "", imageId: -1, imageUrl: "", gender: Gender.MALE, birthDay: "" });