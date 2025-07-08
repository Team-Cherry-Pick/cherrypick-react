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
    const res = await publicRequest<FetchDealsResponse>(HttpMethod.POST, `/search/deal?page=${page}&size=40`, {
        ...searchRequest,
    });

    const cleanedDeals: FetchedDeal[] = res.deals.map((deal: FetchedDeal) => ({
        ...deal,
        title: cleanTitle(deal.title),
        store: cleanStore(deal.store),
    }));

    return {
        deals: cleanedDeals,
        hasNext: res.hasNext,
    };
}

// AI 추천 딜 목록
export async function fetchRecommend(): Promise<FetchRecommendResponse> {
    try {
        const response = await authRequest<FetchRecommendResponse>(HttpMethod.GET, `/deal/recommend`);

        return response;
    } catch (error) {
        console.error('AI 추천 딜 목록 조회 실패:', error);
        throw error;
    }
}

// 상세 딜
export async function fetchDetailedDeal(id: string): Promise<DetailedDeal> {
    const res = await publicRequest<DetailedDeal>(HttpMethod.GET, `/deal/${id}`);
    const deal: DetailedDeal = res;

    return {
        ...deal,
        title: cleanTitle(deal.title),
        store: {
            ...deal.store,
            storeName: cleanStore(deal.store.storeName),
        },
    };
}

export async function uploadDeal(deal: UploadDeal): Promise<UploadDealResponse> {
    try {
        const response = await authRequest<UploadDealResponse>(HttpMethod.POST, '/deal', deal);

        return response;
    } catch (error) {
        console.error('핫딜 업로드 실패:', error);
        throw error;
    }
}

// 스토어 조회
export async function fetchStores(): Promise<Store[]> {
    try {
        const response = await publicRequest<{ stores: Store[] }>(HttpMethod.GET, `/store`);
        return response.stores;
    } catch (error) {
        console.error('스토어 조회 실패:', error);
        throw error;
    }
}

// 할인방식 조회
export async function fetchDiscounts(): Promise<{ discountId: number; name: string }[]> {
    try {
        const response = await publicRequest<{ discounts: { discountId: number; name: string }[] }>(
            HttpMethod.GET,
            `/discount`,
        );
        return response.discounts;
    } catch (error) {
        console.error('할인방식 조회 실패:', error);
        throw error;
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