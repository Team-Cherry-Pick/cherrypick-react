import { SortOptions, SortOption, Header, Title, CommentCount } from './ProductComments.style';

type Props = {
    sortOption: '최신순' | '인기순';
    onChange: (option: '최신순' | '인기순') => void;
};

const CommentHeader = ({ sortOption, onChange }: Props) => (
    <Header>
        <Title>
            댓글 <CommentCount>0</CommentCount>
        </Title>
        <SortOptions>
            <SortOption $selected={sortOption === '최신순'} onClick={() => onChange('최신순')}>
                최신순
            </SortOption>
            |
            <SortOption $selected={sortOption === '인기순'} onClick={() => onChange('인기순')}>
                인기순
            </SortOption>
        </SortOptions>
    </Header>
);

export default CommentHeader;
