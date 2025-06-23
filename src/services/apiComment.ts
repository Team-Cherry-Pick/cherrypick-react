import axios from 'axios';
import { Comment, BestComment } from '@/types/Comment';

export const fetchCommentsByDealId = async (
    dealId: string,
    sortType: 'LATEST' | 'POPULAR'
): Promise<Comment[]> => {
    const url = `${import.meta.env.VITE_API_URL}/comment/${dealId}?sortType=${sortType}`;
    console.log('[fetchCommentsByDealId] Request URL:', url);
    const response = await axios.get(url);
    console.log('[fetchCommentsByDealId] Response data:', response.data);
    return response.data?.comments ?? [];
};

export const fetchBestCommentsByDealId = async (
    dealId: string
): Promise<BestComment[]> => {
    const url = `${import.meta.env.VITE_API_URL}/best-comment/${dealId}`;
    console.log('[fetchBestCommentsByDealId] Request URL:', url);
    const response = await axios.get(url);
    console.log('[fetchBestCommentsByDealId] Response data:', response.data);
    return response.data?.bestComments ?? [];
};
