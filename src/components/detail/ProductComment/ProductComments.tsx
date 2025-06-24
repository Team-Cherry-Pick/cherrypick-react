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
import { timeSince } from '@/utils/timeSince';

type ProductCommentsProps = {
    initialComments: Comment[];
    dealId: string;
};

const ProductComments = ({ initialComments, dealId }: ProductCommentsProps) => {
    const [sortOption, setSortOption] = useState<'최신순' | '인기순'>('최신순');
    const [popularComments, setPopularComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (sortOption === '인기순') {
            fetchCommentsByDealId(dealId, 'POPULAR').then(data => {
                setPopularComments(data);
            });
        }
    }, [sortOption, dealId]);

    const activeComments = sortOption === '인기순' ? popularComments : initialComments;

    return (
        <Wrapper>
            <CommentHeader
                sortOption={sortOption}
                onChange={setSortOption}
                count={activeComments.length}
            />

            {activeComments.length === 0 ? (
                <NoComment>아직 댓글이 없어요. 첫 댓글의 주인공이 되어 보세요!</NoComment>
            ) : (
                <CommentList>
                    {activeComments.map((item) => (
                        <>
                            <CommentItem key={item.commentId}>
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
                                                <ThumbsUp size={14} />{item.totalLikes}
                                            </Likes>
                                            <ItemDivider>|</ItemDivider>
                                            <MessageSquare size={14} />{item.totalReplys}
                                            <ItemDivider>|</ItemDivider>
                                            <Reply>답글달기</Reply>
                                        </LeftSection>
                                        <RightSection>
                                            <CommentTime>{timeSince(item.createdAt)}</CommentTime>
                                        </RightSection>
                                    </CommentFooter>
                                </CommentContent>
                            </CommentItem>
                            <Divider />
                        </>
                    ))}
                </CommentList>
            )}
            <CommentInput />
        </Wrapper>
    );
};

export default ProductComments;
