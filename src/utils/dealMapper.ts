// utils/dealMapper.ts
import type { FetchedDeal, DetailedDeal } from '@/types/Deal';

/**
 * FetchedDeal → DetailedDeal 변환 유틸
 * - heat: 서버 미지원 시 임의값 사용
 * - imageUrl → imageUrls 배열화
 * - user, store, shipping 등 더미 채우기
 */
export const toDetailedDeal = (deal: FetchedDeal): DetailedDeal => ({
    dealId: deal.dealId,
    heat: deal.heat,
    imageUrls: [deal.imageUrl],
    user: {
        userId: 0,
        userName: '익명',
        userImageUrl: '',
    },
    store: {
        storeName: deal.store,
        textColor: '#000000',
        backgroundColor: '#ffffff',
    },
    categorys: [],
    title: deal.title,
    infoTags: deal.infoTags,
    shipping: {
        shippingType: 'FREE',
        shippingPrice: 0,
        shippingRule: '',
    },
    price: deal.price,
    content: '',
    totalViews: 0,
    totalLikes: deal.totalLikes,
    totalUnLikes: 0,
    totalComments: deal.totalComments,
    deepLink: null,
    originalUrl: '',
    soldout: deal.soldout,
});
