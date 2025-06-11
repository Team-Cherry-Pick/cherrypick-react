import axios from 'axios';
import type { FetchDealsResponse, FetchedDeal, DetailedDeal } from '@/types/Deal';
import { cleanTitle, cleanStore } from '@/utils/stringCleaner';

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
    console.log('[📦 fetchDetailedDeal 전체 응답]', res.data); // 전체 출력
    console.log('[🧾 price 정보]', res.data.price);
    return {
        ...deal,
        title: cleanTitle(deal.title),
        store: {
            ...deal.store,
            storeName: cleanStore(deal.store.storeName),
        },
    };
}
