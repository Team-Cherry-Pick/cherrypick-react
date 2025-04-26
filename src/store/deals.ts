// api/deals.ts
import axios from 'axios';

export const fetchDeals = async (page: number) => {
    const res = await axios.get(`/api/deals?page=${page}`);
    return {
        items: res.data.items,
        hasMore: res.data.hasMore,
    };
};
