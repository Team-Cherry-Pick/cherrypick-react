import { useState, useEffect } from 'react';
import CommentHeader from './CommentHeader';
import CommentInput from './CommentInput';
import {
    Wrapper,
    NoComment,
    Divider,
    ItemDivider,
    CommentList,
    CommentItem,
    ProfileImage,
    CommentContent,
    UserName,
    FallbackIcon,
    CommentText,
    CommentFooter,
    Likes,
    Reply,
    CommentTime,
    LeftSection,
    ReplyDivider,
    DeleteButton,
} from './ProductComments.style';
import { fetchCommentsByDealId, deleteCommentById, toggleCommentLike } from '@/services/apiComment';
import type { Comment } from '@/types/Comment';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';
import { getRelativeTime } from '@/utils/time';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';
import { jwtDecode } from 'jwt-decode';
import LikeIcon from '@/assets/icons/like.svg?react';
import TalkBubbleIcon from '@/assets/icons/talkbubble.svg?react';
import DefaultProfileIcon from '@/assets/icons/profile-Icon.svg?react';

type ProductCommentsProps = {
    dealId: string;
    refreshKey?: number;
    onLikeToggle?: () => void;
};

function getUserIdFromToken() {
    const token = AccessTokenService.get(AccessTokenType.USER);
    if (!token) return null;
    try {
        const decoded = jwtDecode<{ userId: number }>(token);
        return decoded.userId;
    } catch {
        return null;
    }
}

const ProductComments = ({ dealId, refreshKey: externalRefreshKey, onLikeToggle }: ProductCommentsProps) => {
    const [sortOption, setSortOption] = useState<'최신순' | '인기순'>('최신순');
    const [comments, setComments] = useState<Comment[]>([]);
    const [popularComments, setPopularComments] = useState<Comment[]>([]);
    const [replyingCommentId, setReplyingCommentId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});

    // 현재 사용자 ID를 가져오는 함수
    const getCurrentUserId = () => getUserIdFromToken();

    // 댓글 로드 - 정렬 옵션에 따라 API 호출
    useEffect(() => {
        if (!dealId) return;

        setLoading(true);
        const sortType = sortOption === '인기순' ? 'POPULAR' : 'LATEST';

        fetchCommentsByDealId(dealId, sortType)
            .then(data => {
                if (sortOption === '인기순') {
                    setPopularComments(data);
                } else {
                    setComments(data);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dealId, sortOption, externalRefreshKey, refreshKey]);

    useEffect(() => {
        // 모든 댓글과 답글을 flatten해서 likeCounts 초기화
        const flatten = (arr: Comment[]) => arr.flatMap(c => [c, ...(c.replies ? c.replies : [])]);
        const all = flatten(comments).concat(flatten(popularComments));

        const counts: { [key: number]: number } = {};

        all.forEach(c => {
            counts[c.commentId] = typeof c.totalLikes === 'number' && !isNaN(c.totalLikes) ? c.totalLikes : 0;
        });

        setLikeCounts(counts);
    }, [comments, popularComments]);

    const handleCommentSuccess = () => {
        setRefreshKey(prev => prev + 1);
        setReplyingCommentId(null);
    };

    const handleLikeToggle = async (commentId: number) => {
        const token = AccessTokenService.get(AccessTokenType.USER);
        if (!token) {
            alert('로그인 후 이용해주세요');
            return;
        }

        // 현재 댓글의 isLiked 상태 찾기
        const findComment = (comments: Comment[]): Comment | null => {
            for (const comment of comments) {
                if (comment.commentId === commentId) return comment;
                if (comment.replies) {
                    const found = comment.replies.find(reply => reply.commentId === commentId);
                    if (found) return found;
                }
            }
            return null;
        };

        const currentComment = findComment(sortOption === '인기순' ? popularComments : comments);
        if (!currentComment) return;

        const currentLikeState = currentComment.isLike ?? false;
        const newLikeState = !currentLikeState;

        try {
            // 낙관적 업데이트 - 댓글 상태도 즉시 업데이트
            const updateCommentLikeState = (comments: Comment[], commentId: number, newState: boolean): Comment[] => {
                return comments.map(comment => {
                    if (comment.commentId === commentId) {
                        return { ...comment, isLiked: newState, totalLikes: comment.totalLikes + (newState ? 1 : -1) };
                    }
                    if (comment.replies) {
                        return {
                            ...comment,
                            replies: comment.replies.map(reply =>
                                reply.commentId === commentId
                                    ? { ...reply, isLiked: newState, totalLikes: reply.totalLikes + (newState ? 1 : -1) }
                                    : reply
                            )
                        };
                    }
                    return comment;
                });
            };

            if (sortOption === '인기순') {
                setPopularComments(prev => updateCommentLikeState(prev, commentId, newLikeState));
            } else {
                setComments(prev => updateCommentLikeState(prev, commentId, newLikeState));
            }

            setLikeCounts(prev => ({
                ...prev,
                [commentId]: prev[commentId] + (newLikeState ? 1 : -1)
            }));

            // API 호출
            await toggleCommentLike(commentId, newLikeState);

            // 성공 시 댓글 목록 다시 가져오기 (서버에서 최신 isLiked 상태 받아오기)
            const sortType = sortOption === '인기순' ? 'POPULAR' : 'LATEST';
            const updatedComments = await fetchCommentsByDealId(dealId, sortType);

            if (sortOption === '인기순') {
                setPopularComments(updatedComments);
            } else {
                setComments(updatedComments);
            }

            // 서버에서 받아온 최신 상태로 likeCounts 업데이트
            const allComments = [...updatedComments, ...updatedComments.flatMap(c => c.replies || [])];
            const newLikeCounts: { [key: number]: number } = {};

            allComments.forEach(comment => {
                newLikeCounts[comment.commentId] = comment.totalLikes;
            });

            setLikeCounts(newLikeCounts);

            // 성공 시 콜백 실행
            onLikeToggle?.();
        } catch {
            alert('좋아요 처리에 실패했습니다.');

            // 실패 시 UI 되돌리기
            setLikeCounts(prev => ({
                ...prev,
                [commentId]: prev[commentId] + (newLikeState ? -1 : 1)
            }));
        }
    };

    const handleDelete = async (commentId: number) => {
        const token = AccessTokenService.get(AccessTokenType.USER);
        if (!token) {
            alert('로그인 후 이용해주세요');
            return;
        }
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
            await deleteCommentById(commentId);
            alert('삭제되었습니다.');

            // 로컬 상태에서 삭제된 댓글 제거
            setComments(prev => prev.filter(comment => comment.commentId !== commentId));
            setPopularComments(prev => prev.filter(comment => comment.commentId !== commentId));

            // 답글인 경우 부모 댓글의 replies에서도 제거
            setComments(prev => prev.map(comment => ({
                ...comment,
                replies: comment.replies?.filter(reply => reply.commentId !== commentId) || []
            })));
            setPopularComments(prev => prev.map(comment => ({
                ...comment,
                replies: comment.replies?.filter(reply => reply.commentId !== commentId) || []
            })));
            handleCommentSuccess();
        } catch {
            alert('삭제에 실패했습니다.');
        }
    };

    const activeComments = sortOption === '인기순' ? popularComments : comments;
    const rootComments = activeComments.filter(c => c.parentId === null);

    const repliesMap = new Map<number, Comment[]>();
    rootComments.forEach(comment => {
        if (comment.replies && comment.replies.length > 0) {
            repliesMap.set(comment.commentId, comment.replies);
        }
    });

    return (
        <Wrapper>
            <CommentHeader
                sortOption={sortOption}
                onChange={setSortOption}
                count={rootComments.length}
            />
            {loading ? (
                <LoadingSpinner />
            ) : rootComments.length === 0 ? (
                <NoComment>아직 댓글이 없어요. 첫 댓글의 주인공이 되어 보세요!</NoComment>
            ) : (
                <CommentList>
                    {rootComments.map((item, idx) => (
                        <div key={item.commentId}>
                            {/* 메인 댓글 */}
                            <CommentItem>
                                {item.user.userImageUrl ? (
                                    <ProfileImage src={item.user.userImageUrl} />
                                ) : (
                                    <FallbackIcon>
                                        <DefaultProfileIcon width={32} height={32} />
                                    </FallbackIcon>
                                )}
                                <CommentContent>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <UserName>{item.user.userName}</UserName>
                                        {getCurrentUserId() === item.user.userId && (
                                            <DeleteButton onClick={() => handleDelete(item.commentId)}>
                                                댓글 삭제
                                            </DeleteButton>
                                        )}
                                    </div>
                                    <CommentText
                                        style={item.isDelete ? { color: 'var(--content-sub, #767676)' } : undefined}
                                    >
                                        {item.isDelete ? '삭제된 댓글입니다.' : item.content}
                                    </CommentText>
                                    <CommentFooter>
                                        <LeftSection>
                                            <Likes onClick={() => handleLikeToggle(item.commentId)} style={{ cursor: 'pointer', color: (item.isLike ?? false) ? 'var(--content-main)' : undefined }}>
                                                <LikeIcon
                                                    className={(item.isLike ?? false) ? 'like-icon-main' : 'like-icon-tertiary'}
                                                    width={14}
                                                    height={14}
                                                    style={{ verticalAlign: 'middle' }}
                                                />
                                                {likeCounts[item.commentId] ?? item.totalLikes}
                                            </Likes>
                                            <ItemDivider>|</ItemDivider>
                                            <TalkBubbleIcon
                                                width={14}
                                                height={14}
                                                style={{ verticalAlign: 'middle' }}
                                            />
                                            {item.totalReplys}
                                            <ItemDivider>|</ItemDivider>
                                            <Reply onClick={() => setReplyingCommentId(item.commentId)}>답글달기</Reply>
                                        </LeftSection>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <CommentTime>{getRelativeTime(item.createdAt)}</CommentTime>
                                        </div>
                                    </CommentFooter>
                                </CommentContent>
                            </CommentItem>

                            {/* 답글 입력창 */}
                            {replyingCommentId === item.commentId && (
                                <>
                                    <ReplyDivider />
                                    <div style={{ marginLeft: '3rem' }}>
                                        <CommentInput
                                            isReply
                                            parentId={item.commentId}
                                            onCancel={() => setReplyingCommentId(null)}
                                            onSuccess={handleCommentSuccess}
                                            userImageUrl={item.user.userImageUrl}
                                        />
                                    </div>
                                </>
                            )}

                            {(repliesMap.get(item.commentId) ?? []).length > 0 && (
                                <ReplyDivider />
                            )}
                            {/* 답글들 표시 */}
                            {(repliesMap.get(item.commentId) ?? []).map((reply, ridx) => (
                                <div key={reply.commentId} style={{ marginLeft: '3rem', marginTop: '1rem' }}>
                                    {/* 답글들 사이 구분선 (긴 선) */}
                                    {ridx !== 0 && <Divider />}
                                    <CommentItem>
                                        {reply.user.userImageUrl ? (
                                            <ProfileImage src={reply.user.userImageUrl} />
                                        ) : (
                                            <FallbackIcon>
                                                <DefaultProfileIcon width={32} height={32} />
                                            </FallbackIcon>
                                        )}
                                        <CommentContent>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <UserName>{reply.user.userName}</UserName>
                                                {getCurrentUserId() === reply.user.userId && (
                                                    <DeleteButton onClick={() => handleDelete(reply.commentId)}>
                                                        댓글 삭제
                                                    </DeleteButton>
                                                )}
                                            </div>
                                            <CommentText
                                                style={reply.isDelete ? { color: 'var(--content-sub, #767676)' } : undefined}
                                            >
                                                {reply.isDelete ? '삭제된 댓글입니다.' : reply.content}
                                            </CommentText>
                                            <CommentFooter>
                                                <LeftSection>
                                                    <Likes onClick={() => handleLikeToggle(reply.commentId)} style={{ cursor: 'pointer', color: (reply.isLike ?? false) ? 'var(--content-main)' : undefined }}>
                                                        <LikeIcon
                                                            className={(reply.isLike ?? false) ? 'like-icon-main' : 'like-icon-tertiary'}
                                                            width={14}
                                                            height={14}
                                                            style={{ verticalAlign: 'middle' }}
                                                        />
                                                        {likeCounts[reply.commentId] ?? reply.totalLikes}
                                                    </Likes>
                                                </LeftSection>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <CommentTime>{getRelativeTime(reply.createdAt)}</CommentTime>
                                                </div>
                                            </CommentFooter>
                                        </CommentContent>
                                    </CommentItem>
                                </div>
                            ))}

                            {/* 댓글 사이 구분선 (긴 선) */}
                            {idx !== rootComments.length - 1 && <Divider />}
                        </div>
                    ))}
                </CommentList>
            )}
            {rootComments.length > 0 && <Divider />}
            <CommentInput onSuccess={handleCommentSuccess} />
        </Wrapper>
    );
};

export default ProductComments;
