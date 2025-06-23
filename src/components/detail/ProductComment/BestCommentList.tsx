import type { BestComment } from '@/types/Comment';
import styled from 'styled-components';

type Props = {
    bestComments: BestComment[];
};

const BestCommentList = ({ bestComments }: Props) => {
    return (
        <BestCommentWrapper>
            <h3>🔥 베스트 댓글</h3>
            {bestComments.map((c) => (
                <BestCommentItem key={c.commentId}>
                    <UserName>{c.user.userName}</UserName> ({c.totalLikes})
                    <CommentContent>{c.content}</CommentContent>
                </BestCommentItem>
            ))}
        </BestCommentWrapper>
    );
};

export default BestCommentList;


const BestCommentWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.neutral[50]};
    border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
    padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[6]};
    border-radius: ${({ theme }) => theme.radius[3]};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[3]};
`;

const BestCommentItem = styled.div`
    padding: ${({ theme }) => theme.spacing[2]};
`;

const UserName = styled.strong`
    font-weight: ${({ theme }) => theme.typography.weight.bold};
`;

const CommentContent = styled.p`
    margin: ${({ theme }) => theme.spacing[1]} 0 0;
    color: ${({ theme }) => theme.colors.content.main};
`;
