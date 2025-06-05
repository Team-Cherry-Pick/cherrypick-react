// store/deals.ts
import { atom } from 'jotai';
import type { RecommendedDeal, DetailedDeal } from '@/types/Deal';

export const selectedDealAtom = atom<RecommendedDeal | DetailedDeal | null>(null);

export const selectedCategoryPathAtom = atom<string>(''); // ex: '생활용품 > 세탁세제'

export const imageFilesAtom = atom<File[]>([]);

// 신규 핫딜 등록 시 사용하는 초기값 (서버 구조 기준 상세용과 유사)
export const newDealAtom = atom<DetailedDeal>({
    dealId: 0,
    heat: 0,
    imageUrls: [],
    user: {
        userId: 0,
        userName: '',
        userImageUrl: '',
    },
    store: {
        storeName: '',
        textColor: '#000000',
        backgroundColor: '#ffffff',
    },
    categorys: [],
    title: '',
    infoTags: [],
    shipping: {
        shippingType: 'FREE',
        shippingPrice: 0,
        shippingRule: '',
    },
    price: {
        priceType: 'KRW',
        regularPrice: 0,
        discountedPrice: 0,
    },
    content: '',
    totalViews: 0,
    totalLikes: 0,
    totalUnLikes: 0,
    totalComments: 0,
    deepLink: null,
    originalUrl: '',
    soldout: false,
});
