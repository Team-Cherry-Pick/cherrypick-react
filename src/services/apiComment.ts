import axios from 'axios';
import { Comment, BestComment } from '@/types/Comment';

export const fetchCommentsByDealId = async (
    dealId: string,
    sortType: 'LATEST' | 'POPULAR'
): Promise<Comment[]> => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comment/${dealId}?sortType=${sortType}&version=v1`
    );
    return response.data ?? [];
};

export const fetchBestCommentsByDealId = async (dealId: string): Promise<BestComment[]> => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/best-comment/${dealId}`
    );
    return response.data ?? [];
};

