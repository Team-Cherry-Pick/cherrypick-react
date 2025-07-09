import type {
    FetchDealsResponse,
    FetchedDeal,
    DetailedDeal,
    UploadDeal,
    UploadDealResponse,
    Store,
    FetchRecommendResponse,
} from '@/types/Deal';
import { cleanTitle, cleanStore } from '@/utils/stringCleaner';
import { HttpMethod } from '@/types/Api';
import { SearchRequest } from '@/store/search';
import { authRequest, publicRequest } from './apiClient';

// 전체 딜 목록
export async function fetchDeals(page: number, searchRequest?: SearchRequest): Promise<FetchDealsResponse> {
    const result = await publicRequest<FetchDealsResponse>(HttpMethod.POST, `/search/deal?page=${page}&size=40`, {
        ...searchRequest,
    });

    if (result.success) {
        const cleanedDeals: FetchedDeal[] = result.data.deals.map((deal: FetchedDeal) => ({
            ...deal,
            title: cleanTitle(deal.title),
            store: cleanStore(deal.store),
        }));
        return {
            deals: cleanedDeals,
            hasNext: result.data.hasNext,
        };
    } else {
        return { deals: [], hasNext: false };
    }
}

// AI 추천 딜 목록
export async function fetchRecommend(): Promise<FetchRecommendResponse> {
    const result = await authRequest<FetchRecommendResponse>(HttpMethod.GET, `/deal/recommend`);

    if (result.success) {
        return result.data;
    } else {
        return {
            deals: [],
        };
    }
}

// 상세 딜
export async function fetchDetailedDeal(id: string): Promise<DetailedDeal> {
    const res = await authRequest<DetailedDeal>(HttpMethod.GET, `/deal/${id}`);
    const deal: DetailedDeal = res;

    if (result.success) {
        return {
            ...result.data,
            title: cleanTitle(result.data.title),
            store: {
                ...result.data.store,
                storeName: cleanStore(result.data.store.storeName),
            },
        };
    } else {
        throw new Error('Failed to fetch detailed deal');
    }
}

export async function uploadDeal(deal: UploadDeal): Promise<UploadDealResponse> {
    const result = await authRequest<UploadDealResponse>(HttpMethod.POST, '/deal', deal);
    if (result.success) {
        return result.data;
    } else {
        throw new Error('Failed to upload deal');
    }
}

// 스토어 조회
export async function fetchStores(): Promise<Store[]> {
    const result = await publicRequest<{ stores: Store[] }>(HttpMethod.GET, `/store`);
    if (result.success) {
        return result.data.stores;
    } else {
        return [];
    }
}

// 할인방식 조회
export async function fetchDiscounts(): Promise<{ discountId: number; name: string }[]> {
    const result = await publicRequest<{ discounts: { discountId: number; name: string }[] }>(
        HttpMethod.GET,
        `/discount`,
    );

    if (result.success) {
        return result.data.discounts;
    } else {
        return [];
    }
}

// 핫딜 종료
export async function endDeal(dealId: number) {
    return authRequest(HttpMethod.PATCH, '/deal', { dealId, isSoldOut: true });
}

// 핫딜 삭제
export async function deleteDeal(dealId: number) {
    return authRequest(HttpMethod.DELETE, `/deal/${dealId}`);
}

// 핫딜 수정
export async function updateDeal(deal: UploadDeal) {
    return authRequest(HttpMethod.PATCH, '/deal', deal);
}