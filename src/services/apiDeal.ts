import axios from 'axios';
import type { FetchDealsResponse } from '@/types/Deal';

const API = import.meta.env.VITE_API_URL;

export const fetchDeals = async (page: number): Promise<FetchDealsResponse> => {
    const res = await axios.post(`${API}/search/deal`, {
        page,
        size: 20,
        sortType: 'LATEST', // 필터 없이 전체 조회
    });

    return {
        deals: res.data.deals,
        hasNext: res.data.hasNext,
    };
};
