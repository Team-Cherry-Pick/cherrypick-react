import { atom } from 'jotai';
import type { Deal } from '@/types/Deal';

export const selectedDealAtom = atom<Deal | null>(null);
