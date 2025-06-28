import { fetchStores } from '@/services/apiDeal';
import { atom } from 'jotai';

export const storesAtom = atom(async () => {
    const response = await fetchStores();
    return response;
});
