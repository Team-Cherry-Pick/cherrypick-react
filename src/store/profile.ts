// store/deals.ts
import { Gender, User } from '@/types/Profile';
import { atom } from 'jotai';

export const currentProfileAtom = atom<User>({ userId: -1, nickname: "", email: "", birthday: "", gender: Gender.MALE, imageURL: "", imageId: -1});
export const newProfileAtom = atom<User>({ userId: -1, nickname: "", email: "", birthday: "", gender: Gender.MALE, imageURL: "", imageId: -1});