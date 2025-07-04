import { fetchDiscounts } from '@/services/apiDeal';
import { atom } from 'jotai';

export const discountsAtom = atom(async () => {
    const response = await fetchDiscounts();
    return response;
});
