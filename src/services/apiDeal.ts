import type {
    FetchDealsResponse,
    FetchedDeal,
    DetailedDeal,
    UploadDeal,
    UpdateDeal,
    UploadDealResponse,
    Store,
    ProductInfo,
    CategorySuggestion,
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

export async function fetchDetailedDeal(id: string): Promise<DetailedDeal> {
    const result = await authRequest<DetailedDeal>(HttpMethod.GET, `/deal/${id}`);

    console.log(result);
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

export async function getPurchaseLog(dealID: number): Promise<void> {
    await authRequest<unknown>(HttpMethod.GET, `/deal/purchase-log?dealId=${dealID}`);
    return;
}

export async function getShareLog(dealID: number): Promise<void> {
    await publicRequest<unknown>(HttpMethod.GET, `/deal/share-log?dealId=${dealID}`);
    return;
}

export async function endDeal(dealId: number) {
    return authRequest(HttpMethod.PATCH, '/deal', { dealId, isSoldOut: true });
}

export async function deleteDeal(dealId: number) {
    return authRequest(HttpMethod.DELETE, `/deal/${dealId}`);
}

export async function updateDeal(deal: UpdateDeal) {
    return authRequest(HttpMethod.PATCH, '/deal', deal);
}

export async function getProductInfoForRepik(url: string): Promise<ProductInfo> {
    const result = await publicRequest<ProductInfo>(
        HttpMethod.GET, 
        `/toolbox/product-info-for-repik?url=${encodeURIComponent(url)}`,
        undefined,
        { timeout: 15000 } // 30초로 타임아웃 증가
    );
    
    if (result.success) {
        return result.data;
    } else {
        throw result.error;
    }
}

export async function getCategorySuggestionForRepik(title: string): Promise<CategorySuggestion> {
    const result = await publicRequest<CategorySuggestion>(
        HttpMethod.GET,
        `/toolbox/category-suggestion-for-repik?title=${encodeURIComponent(title)}`,
        undefined,
        { timeout: 15000 } // 30초로 타임아웃 증가
    );
    
    if (result.success) {
        return result.data;
    } else {
        throw result.error;
    }
}