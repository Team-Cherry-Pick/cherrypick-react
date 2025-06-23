// store/deals.ts
import { atom } from 'jotai';
import type { RecommendedDeal, DetailedDeal, UploadDeal } from '@/types/Deal';
import { Images } from '@/types/Image';

export const selectedDealAtom = atom<RecommendedDeal | DetailedDeal | null>(null);

export const imageFilesAtom = atom<Images>({ images: [], indexes: [] });

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
        regularPrice: 0,
        discountedPrice: 0,
    },
    shipping: {
        shippingType: 'FREE',
        shippingPrice: 0,
        shippingRule: '',
    },
    content: '',
    discountIds: [],
    discountNames: [],
    discountDescription: '',
});
