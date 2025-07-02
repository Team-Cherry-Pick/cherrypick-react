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
import type { Comment } from '@/types/Comment';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';
import { getRelativeTime } from '@/utils/time';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';
import { jwtDecode } from 'jwt-decode';
import LikeIcon from '@/assets/icons/like.svg';
import TalkBubbleIcon from '@/assets/icons/talkbubble.svg';
import DefaultProfileIcon from '@/assets/icons/profile-Icon.svg';

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

const ProductComments = ({ dealId }: ProductCommentsProps) => {
    const [sortOption, setSortOption] = useState<'최신순' | '인기순'>('최신순');
    const [comments, setComments] = useState<Comment[]>([]);
    const [popularComments, setPopularComments] = useState<Comment[]>([]);
    const [replyingCommentId, setReplyingCommentId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [likedComments, setLikedComments] = useState<{ [key: number]: boolean }>({});
    const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});

    // 현재 사용자 ID를 가져오는 함수
    const getCurrentUserId = () => getUserIdFromToken();

    // 최신순 댓글 로드
    useEffect(() => {
        // dealId가 유효한 경우에만 API 호출
        if (dealId) {
            setLoading(true);
            fetchCommentsByDealId(dealId, 'LATEST')
                .then(data => {
                    setComments(data);
                    // 댓글이 없으면 인기순도 빈 배열로 설정
                    if (data.length === 0) {
                        setPopularComments([]);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [dealId, refreshKey]);

    // 인기순 댓글 로드 - 댓글이 있을 때만 호출
    useEffect(() => {
        // 댓글이 있고, 인기순을 선택했을 때만 API 호출
        if (sortOption === '인기순' && dealId && comments.length > 0) {
            setLoading(true);
            fetchCommentsByDealId(dealId, 'POPULAR')
                .then(data => {
                    setPopularComments(data);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else if (sortOption === '인기순' && comments.length === 0) {
            // 댓글이 없으면 인기순도 빈 배열로 설정
            setPopularComments([]);
        }
    }, [sortOption, dealId, refreshKey, comments.length]);

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

        console.log('삭제 시도:', commentId);
        console.log('토큰:', token.substring(0, 20) + '...');
        console.log('삭제 전 댓글 수:', comments.length);

        try {
            const response = await deleteCommentById(commentId, token);
            console.log('삭제 API 응답 전체:', JSON.stringify(response, null, 2));
            console.log('응답 상태:', response.status);
            console.log('응답 데이터:', response.data);
            console.log('응답 헤더:', response.headers);
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

            console.log('삭제 후 댓글 수:', comments.length);

            // API는 성공했지만 실제 삭제가 안 되고 있으므로 강제 새로고침
            console.log('API 성공했지만 실제 삭제가 안 됨. 강제 새로고침 실행');
            handleCommentSuccess();
        } catch (error) {
            console.error('삭제 실패:', error);
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
                                        <img src={DefaultProfileIcon} alt="기본 프로필" width={32} height={32} />
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
                                            <Likes onClick={() => handleLikeToggle(item.commentId)} style={{ cursor: 'pointer', color: likedComments[item.commentId] ? '#1976d2' : undefined }}>
                                                <img
                                                    src={LikeIcon}
                                                    alt="좋아요"
                                                    width={14}
                                                    height={14}
                                                    style={{
                                                        verticalAlign: 'middle',
                                                        ...(likedComments[item.commentId] ? { filter: 'invert(34%) sepia(98%) saturate(749%) hue-rotate(181deg) brightness(93%) contrast(92%)' } : {})
                                                    }}
                                                />
                                                {likeCounts[item.commentId] ?? item.totalLikes}
                                            </Likes>
                                            <ItemDivider>|</ItemDivider>
                                            <img
                                                src={TalkBubbleIcon}
                                                alt="댓글 수"
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
                                                <img src={DefaultProfileIcon} alt="기본 프로필" width={32} height={32} />
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
                                                    <Likes onClick={() => handleLikeToggle(reply.commentId)} style={{ cursor: 'pointer', color: likedComments[reply.commentId] ? '#1976d2' : undefined }}>
                                                        <img
                                                            src={LikeIcon}
                                                            alt="좋아요"
                                                            width={14}
                                                            height={14}
                                                            style={{
                                                                verticalAlign: 'middle',
                                                                ...(likedComments[reply.commentId] ? { filter: 'invert(34%) sepia(98%) saturate(749%) hue-rotate(181deg) brightness(93%) contrast(92%)' } : {})
                                                            }}
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
