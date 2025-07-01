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
        `${import.meta.env.VITE_API_URL}/best-comment/${dealId}?version=v1`
    );
    return response.data ?? [];
};

export const deleteCommentById = async (commentId: number, token: string) => {
    return axios.delete(
        `${import.meta.env.VITE_API_URL}/comment/${commentId}?version=v1`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*'
            }
        }
    );
};

export const toggleCommentLike = async (
    commentId: number,
    isLike: boolean,
    token: string
) => {
    return axios.put(
        `${import.meta.env.VITE_API_URL}/comment/like?version=v1`,
        { commentID: commentId, isLike },
        { headers: { Authorization: `Bearer ${token}` } }
    );
};

