import { atom } from 'jotai';
import type { Category } from '@/types/Category';

export const categoryTreeAtom = atom<Category[] | null>(null);
