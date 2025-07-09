import { authRequest } from './apiClient';
import { HttpMethod } from '@/types/Api';

export type VoteType = 'TRUE' | 'FALSE' | 'NONE';
export type DislikeReason =
    | 'BAD_PRICE'
    | 'BAD_QUALITY'
    | 'WRONG_INFO'
    | 'SOLD_OUT'
    | 'ADVERTISING'
    | 'OTHER';

interface VoteDealParams {
    dealId: number;
    voteType: VoteType;
    dislikeReason?: DislikeReason;
}

interface VoteDealRequestBody {
    voteType: VoteType;
    dislikeReason?: DislikeReason;
}

export async function voteDeal({ dealId, voteType, dislikeReason }: VoteDealParams) {
    const body: VoteDealRequestBody = { voteType };
    if (voteType === 'FALSE') {
        if (!dislikeReason) throw new Error('비추천 사유를 작성해야 합니다.');
        body.dislikeReason = dislikeReason;
    }
    return authRequest(HttpMethod.PUT, `/deal/${dealId}/vote`, body);
} 