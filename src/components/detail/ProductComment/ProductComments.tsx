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
    RightSection,
} from './ProductComments.style';
import { fetchCommentsByDealId } from '@/services/apiComment';
import { MessageSquare, ThumbsUp, CircleUserRound } from 'lucide-react';
import type { Comment } from '@/types/Comment';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';
import { getRelativeTime } from '@/utils/time';

type ProductCommentsProps = {
    initialComments: Comment[];
    dealId: string;
};

const ProductComments = ({ initialComments, dealId }: ProductCommentsProps) => {
    const [sortOption, setSortOption] = useState<'최신순' | '인기순'>('최신순');
    const [popularComments, setPopularComments] = useState<Comment[]>([]);
    const [replyingCommentId, setReplyingCommentId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (sortOption === '인기순') {
            setLoading(true);
            fetchCommentsByDealId(dealId, 'POPULAR')
                .then(data => {
                    setPopularComments(data);
                })
                .catch(error => {
                    if (error?.response?.status === 404) {
                        // 댓글이 없으면 빈 배열로 저장
                        setPopularComments([]);
                    } else {
                        console.error(error);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [sortOption, dealId]);

    const activeComments = sortOption === '인기순' ? popularComments : initialComments;

    return (
        <Wrapper>
            <CommentHeader sortOption={sortOption} onChange={setSortOption} count={activeComments.length} />

            {loading ? (
                <LoadingSpinner />
            ) : activeComments.length === 0 ? (
                <NoComment>아직 댓글이 없어요. 첫 댓글의 주인공이 되어 보세요!</NoComment>
            ) : (
                <CommentList>
                    {activeComments.map(item => (
                        <div key={item.commentId}>
                            <CommentItem>
                                {item.user.userImageUrl ? (
                                    <ProfileImage src={item.user.userImageUrl} />
                                ) : (
                                    <FallbackIcon>
                                        <CircleUserRound size={32} />
                                    </FallbackIcon>
                                )}
                                <CommentContent>
                                    <UserName>{item.user.userName}</UserName>
                                    <CommentText>{item.content}</CommentText>
                                    <CommentFooter>
                                        <LeftSection>
                                            <Likes>
                                                <ThumbsUp size={14} />
                                                {item.totalLikes}
                                            </Likes>
                                            <ItemDivider>|</ItemDivider>
                                            <MessageSquare size={14} />
                                            {item.totalReplys}
                                            <ItemDivider>|</ItemDivider>
                                            <Reply onClick={() => setReplyingCommentId(item.commentId)}>답글달기</Reply>
                                        </LeftSection>
                                        <RightSection>
                                            <CommentTime>{getRelativeTime(item.createdAt)}</CommentTime>
                                        </RightSection>
                                    </CommentFooter>
                                    {replyingCommentId === item.commentId && (
                                        <CommentInput
                                            isReply={true}
                                            onCancel={() => setReplyingCommentId(null)}
                                            userImageUrl={item.user.userImageUrl}
                                        />
                                    )}
                                </CommentContent>
                            </CommentItem>
                            <Divider />
                        </div>
                    ))}
                </CommentList>
            )}
            <CommentInput />
        </Wrapper>
    );
};

export default ProductComments;
