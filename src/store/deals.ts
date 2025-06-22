// store/deals.ts
import { atom } from 'jotai';
import type { RecommendedDeal, DetailedDeal, UploadDeal, Store } from '@/types/Deal';
import { Images } from '@/types/Image';
import { fetchDiscounts, fetchStores } from '@/services/apiDeal';

export const selectedDealAtom = atom<RecommendedDeal | DetailedDeal | null>(null);

export const selectedCategoryPathAtom = atom<string>(''); // ex: '생활용품 > 세탁세제'

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

// 스토어 목록
export const storesAtom = atom(async () => {
    const response = await fetchStores();
    console.log(response);
    return response;
});

// 할인방식 목록
export const discountsAtom = atom(async () => {
    const response = await fetchDiscounts();
    console.log(response);
    return response;
});
