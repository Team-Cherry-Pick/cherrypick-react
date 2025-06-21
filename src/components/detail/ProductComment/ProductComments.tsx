import { useState } from 'react';
import CommentHeader from './CommentHeader';
import CommentInput from './CommentInput';
import {
    Wrapper,
    NoComment,
    Divider,
} from './ProductComments.style';

const ProductComments = () => {
    const [sortOption, setSortOption] = useState<'최신순' | '인기순'>('최신순');

    return (
        <Wrapper>
            <CommentHeader sortOption={sortOption} onChange={setSortOption} />

            <NoComment>아직 댓글이 없어요. 첫 댓글의 주인공이 되어 보세요!</NoComment>

            <Divider />

            <CommentInput />
        </Wrapper>
    );
};

export default ProductComments;

