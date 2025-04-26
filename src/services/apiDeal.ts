import axios from "axios";
import type { FetchDealsResponse } from '@/types/Deal';

export const fetchDeals = async (page: number): Promise<FetchDealsResponse> => {
    const res = await axios.get(`/deal?page=${page}`);
    return {
        items: res.data.items,
        hasMore: res.data.hasMore,
    };
};
