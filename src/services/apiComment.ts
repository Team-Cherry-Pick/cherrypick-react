import { authRequest } from './apiClient';
import { HttpMethod, APIException } from '@/types/Api';
import { Comment, BestComment } from '@/types/Comment';

export const fetchCommentsByDealId = async (
    dealId: string,
    sortType: 'LATEST' | 'POPULAR'
): Promise<Comment[]> => {
    try {
        const response = await authRequest<Comment[]>(
            HttpMethod.GET,
            `/comment/${dealId}?sortType=${sortType}&version=v1`
        );
        return response ?? [];
    } catch (error) {
        // 404 에러는 댓글이 없는 정상적인 상황이므로 조용히 처리
        if ((error as APIException)?.statusCode === 404) {
            return [];
        }
        // 404가 아닌 다른 에러만 콘솔에 로그 (404는 조용히 처리)
        const status = (error as APIException)?.statusCode;
        if (status && status !== 404) {
            console.error('댓글 조회 중 오류 발생:', error);
        }
        return [];
    }
};

export const fetchBestCommentsByDealId = async (dealId: string): Promise<BestComment[]> => {
    try {
        const response = await authRequest<BestComment[]>(
            HttpMethod.GET,
            `/best-comment/${dealId}?version=v1`
        );
        return response ?? [];
    } catch (error) {
        // 404 에러는 베스트 댓글이 없는 정상적인 상황이므로 조용히 처리
        if ((error as APIException)?.statusCode === 404) {
            return [];
        }
        // 404가 아닌 다른 에러만 콘솔에 로그 (404는 조용히 처리)
        const status = (error as APIException)?.statusCode;
        if (status && status !== 404) {
            console.error('베스트 댓글 조회 중 오류 발생:', error);
        }
        return [];
    }
};

export const deleteCommentById = async (commentId: number) => {
    const response = await authRequest(
        HttpMethod.DELETE,
        `/comment/${commentId}?version=v1`
    );
    return response;
};

export const toggleCommentLike = async (
    commentId: number,
    isLike: boolean
) => {
    console.log('댓글 좋아요 API 호출:', {
        commentID: commentId,
        isLike,
        url: '/comment/like?version=v1'
    });

    return authRequest(
        HttpMethod.PUT,
        `/comment/like?version=v1`,
        { commentId, isLike }
    );
};

