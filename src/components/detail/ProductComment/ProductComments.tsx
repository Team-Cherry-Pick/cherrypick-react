import { useState } from 'react';
import CommentHeader from './CommentHeader';
import CommentInput from './CommentInput';
import {
    Wrapper,
    NoComment,
    Divider,
} from './ProductComments.style';
import type { Comment } from '@/types/Comment';

type ProductCommentsProps = {
    comments: Comment[];
};

const ProductComments = ({ comments }: ProductCommentsProps) => {
    const [sortOption, setSortOption] = useState<'최신순' | '인기순'>('최신순');

    return (
        <Wrapper>
            <CommentHeader sortOption={sortOption} onChange={setSortOption} />

            {comments?.length === 0 ? (
                <NoComment>아직 댓글이 없어요. 첫 댓글의 주인공이 되어 보세요!</NoComment>
            ) : (
                // 댓글 리스트 매핑 컴포넌트 추후 삽입
                <div>댓글 {comments?.length}</div>
            )}

            <Divider />

            <CommentInput />
        </Wrapper>
    );
};

export default ProductComments;

