import axios from 'axios';
import type {
    FetchDealsResponse,
    FetchedDeal,
    DetailedDeal,
    UploadDeal,
    UploadDealResponse,
    Store,
} from '@/types/Deal';
import { cleanTitle, cleanStore } from '@/utils/stringCleaner';
import apiClientService from './apiClientService';
import { HttpMethod } from '@/types/Api';

const API = import.meta.env.VITE_API_URL;

// 전체 딜 목록
export async function fetchDeals(page: number): Promise<FetchDealsResponse> {
    const res = await axios.post(`${API}/search/deal`, {
        page,
        size: 20,
        sortType: 'LATEST',
    });

    const cleanedDeals: FetchedDeal[] = res.data.deals.map((deal: FetchedDeal) => ({
        ...deal,
        title: cleanTitle(deal.title),
        store: cleanStore(deal.store),
    }));

    return {
        deals: cleanedDeals,
        hasNext: res.data.hasNext,
    };
}

// 상세 딜
export async function fetchDetailedDeal(id: string): Promise<DetailedDeal> {
    const res = await axios.get(`${API}/deal/${id}`);
    const deal: DetailedDeal = res.data;

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
        const response = await apiClientService.request<UploadDealResponse>(HttpMethod.POST, '/deal', deal);

        return response;
    } catch (error) {
        console.error('핫딜 업로드 실패:', error);
        throw error;
    }
}

// 스토어 조회
export async function fetchStores(): Promise<Store[]> {
    try {
        const response = await axios.get(`${API}/store`);
        return response.data.stores;
    } catch (error) {
        console.error('스토어 조회 실패:', error);
        throw error;
    }
}

// 할인방식 조회
export async function fetchDiscounts(): Promise<{ discountId: number; name: string }[]> {
    try {
        const response = await axios.get(`${API}/discount`);
        return response.data.discounts;
    } catch (error) {
        console.error('할인방식 조회 실패:', error);
        throw error;
    }
}
