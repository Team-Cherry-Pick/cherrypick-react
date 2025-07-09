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

export async function fetchDetailedDeal(id: string): Promise<DetailedDeal> {
    const result = await authRequest<DetailedDeal>(HttpMethod.GET, `/deal/${id}`);
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
        throw result.error;
    }
}

export async function uploadDeal(deal: UploadDeal): Promise<UploadDealResponse> {
    const result = await authRequest<UploadDealResponse>(HttpMethod.POST, '/deal', deal);
    if (result.success) {
        return result.data;
    } else {
        throw result.error;
    }
}

export async function fetchStores(): Promise<Store[]> {
    const result = await publicRequest<{ stores: Store[] }>(HttpMethod.GET, `/store`);
    if (result.success) {
        return result.data.stores;
    } else {
        return [];
    }
}

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

export async function endDeal(dealId: number) {
    return authRequest(HttpMethod.PATCH, '/deal', { dealId, isSoldOut: true });
}

export async function deleteDeal(dealId: number) {
    return authRequest(HttpMethod.DELETE, `/deal/${dealId}`);
}

export async function updateDeal(deal: UploadDeal) {
    return authRequest(HttpMethod.PATCH, '/deal', deal);
}