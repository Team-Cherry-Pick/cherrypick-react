import axios from 'axios';
import { Comment } from '@/types/Comment';

export const fetchCommentsByDealId = async (dealId: string, sortType: 'LATEST' | 'POPULAR' = 'LATEST'): Promise<Comment[]> => {
    const res = await axios.get<{ comments: Comment[] }>(
        `${import.meta.env.VITE_API_URL}/comment/${dealId}`,
        { params: { sortType } }
    );
    return res.data.comments;
};
