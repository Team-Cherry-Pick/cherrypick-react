// store/deals.ts
import { atom } from 'jotai';
import type { RecommendedDeal, DetailedDeal, UploadDeal } from '@/types/Deal';

export const selectedDealAtom = atom<RecommendedDeal | DetailedDeal | null>(null);

// 핫딜 등록 초기값
export const newDealAtom = atom<UploadDeal>({
    title: '',
    categoryId: undefined,
    imageIds: [],
    originalUrl: '',
    storeId: undefined,
    storeName: '',
    price: {
        priceType: 'KRW',
        discountedPrice: 0,
    },
    shippingType: 'FREE',
    content: '',
    discountIds: [],
    discountNames: [],
})