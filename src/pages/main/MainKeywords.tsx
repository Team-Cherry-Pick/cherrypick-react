import styled from 'styled-components';

interface MainKeywordsProps {
    aiActive: boolean;
    keyword: string | null;
}

const MainKeywords = ({ aiActive, keyword }: MainKeywordsProps) => {
    if (!aiActive && !keyword) return null;

    return <SearchResult>{aiActive ? 'AI 추천 검색 결과' : `‘${keyword}‘ 검색 결과`}</SearchResult>;
};
export default MainKeywords;

const SearchResult = styled.span`
    flex: 1;
    font-size: ${({ theme }) => theme.typography.size.xxl};
    font-weight: ${({ theme }) => theme.typography.weight.bold};
    line-height: 2rem;
`;
