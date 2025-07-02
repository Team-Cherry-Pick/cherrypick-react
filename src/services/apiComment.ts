import axios, { AxiosError } from 'axios';
import { Comment, BestComment } from '@/types/Comment';

export const fetchCommentsByDealId = async (
    dealId: string,
    sortType: 'LATEST' | 'POPULAR'
): Promise<Comment[]> => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/comment/${dealId}?sortType=${sortType}&version=v1`
        );
        return response.data ?? [];
    } catch (error) {
        // 404 에러는 댓글이 없는 정상적인 상황이므로 조용히 처리
        if ((error as AxiosError)?.response?.status === 404) {
            return [];
        }
        // 404가 아닌 다른 에러만 콘솔에 로그 (404는 조용히 처리)
        const status = (error as AxiosError)?.response?.status;
        if (status && status !== 404) {
            console.error('댓글 조회 중 오류 발생:', error);
        }
        return [];
    }
};

export const fetchBestCommentsByDealId = async (dealId: string): Promise<BestComment[]> => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/best-comment/${dealId}?version=v1`
        );
        return response.data ?? [];
    } catch (error) {
        // 404 에러는 베스트 댓글이 없는 정상적인 상황이므로 조용히 처리
        if ((error as AxiosError)?.response?.status === 404) {
            return [];
        }
        // 404가 아닌 다른 에러만 콘솔에 로그 (404는 조용히 처리)
        const status = (error as AxiosError)?.response?.status;
        if (status && status !== 404) {
            console.error('베스트 댓글 조회 중 오류 발생:', error);
        }
        return [];
    }
};

export const deleteCommentById = async (commentId: number, token: string) => {
    console.log('삭제 API 호출:', `${import.meta.env.VITE_API_URL}/comment/${commentId}?version=v1`);
    const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/comment/${commentId}?version=v1`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*'
            }
        }
    );
    console.log('삭제 API 서비스 응답:', response);
    return response;
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

