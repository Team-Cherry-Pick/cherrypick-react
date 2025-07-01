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
import { fetchCommentsByDealId, deleteCommentById } from '@/services/apiComment';
import { MessageSquare, ThumbsUp, CircleUserRound } from 'lucide-react';
import type { Comment } from '@/types/Comment';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';
import { getRelativeTime } from '@/utils/time';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';
import { jwtDecode } from 'jwt-decode';

type ProductCommentsProps = {
    dealId: string;
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

const myUserId = getUserIdFromToken();

const ProductComments = ({ dealId }: ProductCommentsProps) => {
    const [sortOption, setSortOption] = useState<'최신순' | '인기순'>('최신순');
    const [comments, setComments] = useState<Comment[]>([]);
    const [popularComments, setPopularComments] = useState<Comment[]>([]);
    const [replyingCommentId, setReplyingCommentId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [likedComments, setLikedComments] = useState<{ [key: number]: boolean }>({});
    const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});

    // 최신순 댓글 로드
    useEffect(() => {
        setLoading(true);
        fetchCommentsByDealId(dealId, 'LATEST')
            .then(data => {
                setComments(data);
            })
            .catch(error => {
                if (error?.response?.status === 404) {
                    setComments([]);
                } else {
                    console.error(error);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dealId, refreshKey]);

    // 인기순 댓글 로드
    useEffect(() => {
        if (sortOption === '인기순') {
            setLoading(true);
            fetchCommentsByDealId(dealId, 'POPULAR')
                .then(data => {
                    setPopularComments(data);
                })
                .catch(error => {
                    if (error?.response?.status === 404) {
                        setPopularComments([]);
                    } else {
                        console.error(error);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [sortOption, dealId, refreshKey]);

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

    const handleLikeToggle = (commentId: number) => {
        setLikedComments(prev => ({ ...prev, [commentId]: !prev[commentId] }));
        setLikeCounts(prev => ({
            ...prev,
            [commentId]: prev[commentId] + (likedComments[commentId] ? -1 : 1)
        }));
    };

    const handleDelete = async (commentId: number) => {
        const token = AccessTokenService.get(AccessTokenType.USER);
        if (!token) {
            alert('로그인 후 이용해주세요');
            return;
        }
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            await deleteCommentById(commentId, token);
            alert('삭제되었습니다.');
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
                                        <CircleUserRound size={32} />
                                    </FallbackIcon>
                                )}
                                <CommentContent>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <UserName>{item.user.userName}</UserName>
                                        {myUserId === item.user.userId && (
                                            <DeleteButton onClick={() => handleDelete(item.commentId)}>
                                                댓글 삭제
                                            </DeleteButton>
                                        )}
                                    </div>
                                    <CommentText>{item.content}</CommentText>
                                    <CommentFooter>
                                        <LeftSection>
                                            <Likes onClick={() => handleLikeToggle(item.commentId)} style={{ cursor: 'pointer', color: likedComments[item.commentId] ? '#1976d2' : undefined }}>
                                                <ThumbsUp size={14} fill={likedComments[item.commentId] ? '#1976d2' : 'none'} />
                                                {likeCounts[item.commentId] ?? item.totalLikes}
                                            </Likes>
                                            <ItemDivider>|</ItemDivider>
                                            <MessageSquare size={14} />
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

                            {/* 댓글과 답글 사이 구분선 (짧은 선) */}
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
                                                <CircleUserRound size={32} />
                                            </FallbackIcon>
                                        )}
                                        <CommentContent>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <UserName>{reply.user.userName}</UserName>
                                                {myUserId === reply.user.userId && (
                                                    <DeleteButton onClick={() => handleDelete(reply.commentId)}>
                                                        댓글 삭제
                                                    </DeleteButton>
                                                )}
                                            </div>
                                            <CommentText>{reply.content}</CommentText>
                                            <CommentFooter>
                                                <LeftSection>
                                                    <Likes onClick={() => handleLikeToggle(reply.commentId)} style={{ cursor: 'pointer', color: likedComments[reply.commentId] ? '#1976d2' : undefined }}>
                                                        <ThumbsUp size={14} fill={likedComments[reply.commentId] ? '#1976d2' : 'none'} />
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

                            {/* 답글 입력창 */}
                            {replyingCommentId === item.commentId && (
                                <div style={{ marginTop: '1rem', marginLeft: '3rem' }}>
                                    <CommentInput
                                        isReply
                                        parentId={item.commentId}
                                        onCancel={() => setReplyingCommentId(null)}
                                        onSuccess={handleCommentSuccess}
                                        userImageUrl={item.user.userImageUrl}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </CommentList>
            )}
            <CommentInput onSuccess={handleCommentSuccess} />
        </Wrapper>
    );
};

export default ProductComments;
