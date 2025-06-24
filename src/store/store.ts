import { fetchStores } from '@/services/apiDeal';
import { atom } from 'jotai';

export const storesAtom = atom(async () => {
    const response = await fetchStores();
    console.log(response);
    return response;
});
