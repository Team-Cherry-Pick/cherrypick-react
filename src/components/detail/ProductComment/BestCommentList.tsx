import { useState, useEffect } from 'react';
import { BestComment } from '@/types/Comment';
import { toggleCommentLike } from '@/services/apiComment';
import { AccessTokenService } from '@/services/accessTokenService';
import { fetchBestCommentsByDealId } from '@/services/apiComment';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
    ProfileImage,
    CommentText,
    CommentContent,
    UserName,
    FallbackIcon,
    Likes,
} from './ProductComments.style';
import LikeIcon from '@/assets/icons/like.svg?react';
import DefaultProfileIcon from '@/assets/icons/profile-Icon.svg?react';

interface Props {
    bestComments: BestComment[];
    onLikeToggle?: () => void;
}

const BestCommentList = ({ bestComments, onLikeToggle }: Props) => {
    const { id: dealId } = useParams();
    // 좋아요 상태 및 카운트 관리
    const [likedComments, setLikedComments] = useState<{ [key: number]: boolean }>(
        () => Object.fromEntries(bestComments.map(item => [item.commentId, item.isLiked ?? false]))
    );
    const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>(
        () => Object.fromEntries(bestComments.map(item => [item.commentId, item.totalLikes]))
    );

    // bestComments가 변경되면 상태 업데이트
    useEffect(() => {
        const newLikedComments: { [key: number]: boolean } = {};
        const newLikeCounts: { [key: number]: number } = {};

        bestComments.forEach(comment => {
            newLikedComments[comment.commentId] = comment.isLiked ?? false;
            newLikeCounts[comment.commentId] = comment.totalLikes;
        });

        setLikedComments(newLikedComments);
        setLikeCounts(newLikeCounts);
    }, [bestComments]);

    const handleLikeToggle = async (commentId: number) => {
        const token = AccessTokenService.get();
        if (!token) {
            alert('로그인 후 이용해주세요');
            return;
        }

        const currentLikeState = likedComments[commentId];
        const newLikeState = !currentLikeState;

        try {
            // UI 먼저 업데이트 (낙관적 업데이트)
            setLikedComments(prev => ({ ...prev, [commentId]: newLikeState }));
            setLikeCounts(prev => ({
                ...prev,
                [commentId]: prev[commentId] + (newLikeState ? 1 : -1)
            }));

            // API 호출
            await toggleCommentLike(commentId, newLikeState);

            // 성공 시 베스트 댓글 목록 다시 가져오기 (서버에서 최신 isLiked 상태 받아오기)
            if (dealId) {
                const updatedBestComments = await fetchBestCommentsByDealId(dealId);

                // 서버에서 받아온 최신 상태로 업데이트
                const newLikedComments: { [key: number]: boolean } = {};
                const newLikeCounts: { [key: number]: number } = {};

                updatedBestComments.forEach(comment => {
                    newLikedComments[comment.commentId] = comment.isLiked ?? false;
                    newLikeCounts[comment.commentId] = comment.totalLikes;
                });

                setLikedComments(newLikedComments);
                setLikeCounts(newLikeCounts);
            }

            // 성공 시 콜백 실행 (댓글 새로고침)
            onLikeToggle?.();
        } catch {
            alert('좋아요 처리에 실패했습니다.');

            // 실패 시 UI 되돌리기 (원래 상태로 복원)
            setLikedComments(prev => ({ ...prev, [commentId]: currentLikeState }));
            setLikeCounts(prev => ({
                ...prev,
                [commentId]: prev[commentId] + (newLikeState ? -1 : 1)
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
                            <DefaultProfileIcon width={32} height={32} />
                        </FallbackIcon>
                    )}
                    <CommentContent>
                        <HeaderRow>
                            <UserName>{item.user.userName}</UserName>
                            <Likes onClick={() => handleLikeToggle(item.commentId)} style={{ cursor: 'pointer', color: likedComments[item.commentId] ? 'var(--content-main)' : undefined }}>
                                <LikeIcon
                                    className={likedComments[item.commentId] ? 'like-icon-main' : 'like-icon-tertiary'}
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
    padding: 2rem 1.125rem;
    gap: 1rem;
`;

const Title = styled.h3`
    color: ${({ theme }) => theme.colors.content.main};
    font-weight: ${({ theme }) => theme.typography.weight.semibold};
    font-size: 1.125rem;
`;

const BestCommentItem = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.background.card};
    border-radius: 1rem;
    padding: 1rem;
    box-sizing: border-box;
    box-shadow: var(--box-shadow);
    border: 0.5px solid ${({ theme }) => theme.colors.border.card};
`;

const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

