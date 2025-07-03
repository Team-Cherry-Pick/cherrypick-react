import type { BestComment } from '@/types/Comment';
import styled from 'styled-components';
import {
    ProfileImage,
    CommentText,
    CommentContent,
    UserName,
    FallbackIcon,
    Likes,
} from './ProductComments.style';
import { CircleUserRound } from 'lucide-react';
import LikeMainIcon from '@/assets/icons/like-main.svg';
import LikeTertiaryIcon from '@/assets/icons/like-tertiary.svg';
import { useState } from 'react';
import { toggleCommentLike } from '@/services/apiComment';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';

type Props = {
    bestComments: BestComment[];
    onLikeToggle?: () => void;
};

const BestCommentList = ({ bestComments, onLikeToggle }: Props) => {
    // 좋아요 상태 및 카운트 관리
    const [likedComments, setLikedComments] = useState<{ [key: number]: boolean }>(
        () => Object.fromEntries(bestComments.map(item => [item.commentId, false]))
    );
    const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>(
        () => Object.fromEntries(bestComments.map(item => [item.commentId, item.totalLikes]))
    );

    const handleLikeToggle = async (commentId: number) => {
        const token = AccessTokenService.get(AccessTokenType.USER);
        if (!token) {
            alert('로그인 후 이용해주세요');
            return;
        }

        const isLike = !likedComments[commentId];

        try {
            // UI 먼저 업데이트
            setLikedComments(prev => ({ ...prev, [commentId]: isLike }));
            setLikeCounts(prev => ({
                ...prev,
                [commentId]: prev[commentId] + (isLike ? 1 : -1)
            }));

            // API 호출
            await toggleCommentLike(commentId, isLike, token);

            // 성공 시 콜백 실행 (댓글 새로고침)
            onLikeToggle?.();
        } catch (error) {
            console.error('좋아요 토글 실패:', error);
            alert('좋아요 처리에 실패했습니다.');

            // 실패 시 UI 되돌리기
            setLikedComments(prev => ({ ...prev, [commentId]: !isLike }));
            setLikeCounts(prev => ({
                ...prev,
                [commentId]: prev[commentId] + (isLike ? -1 : 1)
            }));
        }
    };

    return (
        <BestCommentWrapper>
            <Title>🔥 베스트 댓글</Title>
            {bestComments.map((item) => (
                <BestCommentItem key={item.commentId}>
                    {item.user.userImageUrl ? (
                        <ProfileImage src={item.user.userImageUrl} />
                    ) : (
                        <FallbackIcon>
                            <CircleUserRound size={32} />
                        </FallbackIcon>
                    )}
                    <CommentContent>
                        <HeaderRow>
                            <UserName>{item.user.userName}</UserName>
                            <Likes onClick={() => handleLikeToggle(item.commentId)} style={{ cursor: 'pointer', color: likedComments[item.commentId] ? 'var(--contant-main)' : undefined }}>
                                <img
                                    src={likedComments[item.commentId] ? LikeMainIcon : LikeTertiaryIcon}
                                    alt="좋아요"
                                    width={14}
                                    height={14}
                                    style={{ verticalAlign: 'middle' }}
                                />
                                {likeCounts[item.commentId] ?? item.totalLikes}
                            </Likes>
                        </HeaderRow>
                        <CommentText>{item.content}</CommentText>
                    </CommentContent>
                </BestCommentItem>
            ))}
        </BestCommentWrapper>
    );
};

export default BestCommentList;

const BestCommentWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.neutral[50]};
    padding: ${({ theme }) => theme.spacing[5]};
    border-radius: ${({ theme }) => theme.radius[4]};
    gap: ${({ theme }) => theme.spacing[4]};
`;

const Title = styled.h3`
    margin-top: ${({ theme }) => theme.spacing[3]};
    color: ${({ theme }) => theme.colors.content.main};
    font-weight: ${({ theme }) => theme.typography.weight.semibold};
    font-size: ${({ theme }) => theme.typography.size.xl};
`;

const BestCommentItem = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.neutral[20]};
    border-radius: ${({ theme }) => theme.radius[4]};
    padding: ${({ theme }) => theme.spacing[4]};
    box-sizing: border-box;
`;

const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

