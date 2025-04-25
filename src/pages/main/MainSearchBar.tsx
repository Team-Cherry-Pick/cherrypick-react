import { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@/assets/icons/search-Icon.svg?react';

const MainSearchBar = () => {
    const [query, setQuery] = useState('');

    return (
        <SearchBarWrapper>
            <SearchInput
                type="text"
                placeholder="검색어를 입력해주세요"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <SearchButton active={!!query}>
                <SearchIcon />
            </SearchButton>
        </SearchBarWrapper>
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
  color: ${({ theme }) => theme.colors.content.tertiary};
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
        active ? theme.colors.neutral[800] : theme.colors.neutral[300]};
  display: flex;
  align-items: center;
  justify-content: center;

    svg {
    width: ${({ theme }) => theme.spacing[4]};
    height: ${({ theme }) => theme.spacing[4]};
    fill: #ffffff;
    }
`;

