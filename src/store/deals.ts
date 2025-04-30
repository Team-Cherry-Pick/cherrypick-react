// store/deals.ts
import { atom } from 'jotai';
import type { Deal } from '@/types/Deal';

export const selectedDealAtom = atom<Deal | null>(null);
export const selectedCategoryPathAtom = atom<string>('');
export const imageFilesAtom = atom<File[]>([]);

export const newDealAtom = atom<Deal>({
    dealId: 0,
    imageUrls: [],
    title: '',
    categoryId: 0,
    originalUrl: '',
    storeId: 0,
    storeName: '',
    price: {
        priceType: null,
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
    isSoldOut: false,
    viewCount: 0,
    likeCount: 0,
    commentCount: 0,
});
