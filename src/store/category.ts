// store/category.ts
import { atom } from 'jotai';
import type { CategoryTree } from '@/types/Category';

export const categoryTreeAtom = atom<CategoryTree>({ categories: [] });
