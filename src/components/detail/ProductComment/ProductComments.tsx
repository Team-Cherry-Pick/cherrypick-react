import { useState, useEffect } from 'react';
import CommentHeader from './CommentHeader';
import CommentInput from './CommentInput';
import {
    Wrapper,
    NoComment,
    Divider,
    CommentList,
    CommentItem,
    ProfileImage,
    CommentContent,
    UserName,
    CommentText,
    CommentFooter,
    CommentStat,
} from './ProductComments.style';
import { fetchCommentsByDealId } from '@/services/apiComment';
import { MessageSquare } from 'lucide-react';
import type { Comment } from '@/types/Comment';

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
                        <CommentItem key={item.commentId}>
                            <ProfileImage
                                src={item.user.userImageUrl ?? '/fallback.png'}
                                alt={item.user.userName}
                            />
                            <CommentContent>
                                <UserName>{item.user.userName}</UserName>
                                <CommentText>{item.content}</CommentText>
                                <CommentFooter>
                                    <CommentStat>👍 {item.totalLikes}</CommentStat>
                                    <MessageSquare />{item.totalReplys}
                                </CommentFooter>
                            </CommentContent>
                        </CommentItem>
                    ))}
                </CommentList>
            )}
            <Divider />
            <CommentInput />
        </Wrapper>
    );
};

export default ProductComments;
