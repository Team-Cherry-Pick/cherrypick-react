import { authRequest } from './apiClient';
import { HttpMethod } from '@/types/Api';
import { Comment, BestComment } from '@/types/Comment';

export const fetchCommentsByDealId = async (
    dealId: string,
    sortType: 'LATEST' | 'POPULAR'
): Promise<Comment[]> => {
    const result = await authRequest<Comment[]>(
        HttpMethod.GET,
        `/comment/${dealId}?sortType=${sortType}&version=v1`
    );
    if ('success' in result) {
        if (result.success) {
            return result.data ?? [];
        } else {
            if (result.error?.statusCode === 404) {
                return [];
            }
            throw result.error;
        }
    }
    return result ?? [];
};

export const fetchBestCommentsByDealId = async (dealId: string): Promise<BestComment[]> => {
    const result = await authRequest<BestComment[]>(
        HttpMethod.GET,
        `/best-comment/${dealId}?version=v1`
    );
    if ('success' in result) {
        if (result.success) {
            return result.data ?? [];
        } else {
            if (result.error?.statusCode === 404) {
                return [];
            }
            throw result.error;
        }
    }
    return result ?? [];
};

export const deleteCommentById = async (commentId: number) => {
    return authRequest(
        HttpMethod.DELETE,
        `/comment/${commentId}?version=v1`
    );
};

export const toggleCommentLike = async (
    commentId: number,
    isLike: boolean
) => {
    return authRequest(
        HttpMethod.PUT,
        `/comment/like?version=v1`,
        { commentId, isLike }
    );
};

