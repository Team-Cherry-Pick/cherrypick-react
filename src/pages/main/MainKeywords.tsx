import styled from 'styled-components';

interface Props {
    keyword: string | null;
}

const MainKeywords = ({ keyword }: Props) => {
    if (!keyword) return null;

    return <SearchResult>'{keyword}' 검색 결과</SearchResult>;
};
export default MainKeywords;

const SearchResult = styled.span`
    font-size: ${({ theme }) => theme.typography.size.xxl};
    font-weight: ${({ theme }) => theme.typography.weight.bold};
    flex: 1;
`;
