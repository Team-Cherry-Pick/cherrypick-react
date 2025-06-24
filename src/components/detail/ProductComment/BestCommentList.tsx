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
import { CircleUserRound, ThumbsUp } from 'lucide-react';

type Props = {
    bestComments: BestComment[];
};

const BestCommentList = ({ bestComments }: Props) => {
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
                            <Likes>
                                <ThumbsUp size={16} />
                                {item.totalLikes}
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
    padding: ${({ theme }) => theme.spacing[6]};
    border-radius: ${({ theme }) => theme.radius[4]};
    gap: ${({ theme }) => theme.spacing[3]};
`;

const Title = styled.h3`
    margin: ${({ theme }) => theme.spacing[2]} 0;
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

