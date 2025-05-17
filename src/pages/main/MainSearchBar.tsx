import { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@/assets/icons/search-Icon.svg?react';

const MainSearchBar = () => {
    const [query, setQuery] = useState('');
    const [recentKeywords, setRecentKeywords] = useState<string[]>([
        '갤럭시',
        '플스',
        '닌텐도',
        '다이슨',
        'my'
    ]);

    const handleRemoveKeyword = (index: number) => {
        setRecentKeywords((prev) => prev.filter((_, i) => i !== index));
    };

    const handleClearAll = () => {
        setRecentKeywords([]);
    };

    const handleSearch = () => {
        const trimmed = query.trim();
        if (!trimmed) return;

        setRecentKeywords(prev => {
            const filtered = prev.filter(item => item !== trimmed);
            return [trimmed, ...filtered];
        });

        setQuery('');
    };

    return (
        <SearchContainer>
            <SearchBarWrapper>
                <SearchInput
                    type="text"
                    placeholder="검색어를 입력해주세요"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <SearchButton active={!!query} onClick={handleSearch}>
                    <SearchIcon />
                </SearchButton>
            </SearchBarWrapper>

            {recentKeywords.length > 0 && (
                <RecentSearchWrapper>
                    <RecentHeader>
                        <span>최근 검색어</span>
                        {recentKeywords.length >= 4 && (
                            <ClearAllBtn onClick={handleClearAll}>모두삭제</ClearAllBtn>
                        )}
                    </RecentHeader>
                    <RecentKeywordList>
                        {recentKeywords.map((keyword, idx) => (
                            <KeywordItem key={idx}>
                                {keyword}
                                <RemoveBtn onClick={() => handleRemoveKeyword(idx)}>✕</RemoveBtn>
                            </KeywordItem>
                        ))}
                    </RecentKeywordList>
                </RecentSearchWrapper>
            )}
        </SearchContainer>
    );

};

export default MainSearchBar;

const SearchBarWrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.spacing[12]};
  border: 1px solid ${({ theme }) => theme.colors.border.board};
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius[6]};
  padding: 0 ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.background.card};
`;

const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  font-size: ${({ theme }) => theme.typography.size.base};
  color: ${({ theme }) => theme.colors.content.main};
  padding-left: ${({ theme }) => theme.spacing[2]};
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.tertiary};
  }
`;

const SearchButton = styled.button<{ active: boolean }>`
  width: ${({ theme }) => theme.spacing[8]};
  height: ${({ theme }) => theme.spacing[8]};
  border-radius: 2rem;
  background-color: ${({ theme, active }) =>
        active ? theme.colors.primary : theme.colors.neutral[300]};
  display: flex;
  align-items: center;
  justify-content: center;

    svg {
    width: ${({ theme }) => theme.spacing[4]};
    height: ${({ theme }) => theme.spacing[4]};
    fill: #ffffff;
    }
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const RecentSearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.content.sub};
`;

const RecentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.content.sub};
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ClearAllBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.content.sub};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.size.sm};
  text-decoration: underline;
  margin-right: ${({ theme }) => theme.spacing[6]};
`;

const RecentKeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const KeywordItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.content.main};
`;

const RemoveBtn = styled.button`
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.typography.size.base};
  color: ${({ theme }) => theme.colors.content.sub};
  cursor: pointer;
`;
