import styled from 'styled-components';
import { useState, useEffect } from 'react';
import DefaultLayout from '@/components/layout/DefaultLayout';
import MainSearchBar from './MainSearchBar';
import MainDealList from './MainDealList';
import MainFilter from './MainFilter';
import MainKeywords from './MainKeywords';
import SortButtons from './SortButtons';
import UploadBtn from '@/components/common/Floating/UploadBtn';
import ScrollTopBtn from '@/components/common/Floating/ScrollTopBtn';

const MainPage = () => {
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [committedQuery, setCommittedQuery] = useState<string | null>(null);

    useEffect(() => {
        if (searchQuery) {
            setCommittedQuery(searchQuery);
        }
    }, [searchQuery]);

    return (
        <DefaultLayout>
            <MainSearchWrapper>
                <EmptyBox />
                <MainSearchBar onSearch={(keyword) => setSearchQuery(keyword)} />
            </MainSearchWrapper>

            <SortRow>
                <EmptyBox />
                <MainKeywords keyword={committedQuery} />
                <SortButtons />
            </SortRow>

            <ContentWrapper>
                <MainFilter />
                <MainDealList />
                {/* [To do] API 응답 없거나 오류 발생 시 예외 처리 로직 추가해야합니다 */}
            </ContentWrapper>

            <FloatingWrapper>
                <UploadBtn />
                <ScrollTopBtn />
            </FloatingWrapper>

        </DefaultLayout>
    );
};

export default MainPage;

const MainSearchWrapper = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const SortRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: 768px) {
    flex-direction: column; // 리스트만 보여줄 때 세로 정렬
  }

  & > div:first-child {
    @media (max-width: 768px) {
      display: none; // 첫 번째 자식인 필터 숨김
    }
  }
`;

const FloatingWrapper = styled.div`
  position: fixed;
  right: ${({ theme }) => theme.spacing[4]};
  bottom: ${({ theme }) => theme.spacing[6]};
  padding-inline: ${({ theme }) => theme.spacing[20]};
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing[3]};
  z-index: 100;
`;

const EmptyBox = styled.div`
    width: 20%;
    min-width: 240px;
    height: auto;
    visibility: hidden;
    pointer-events: none;

    @media (max-width: 769px) {
        display: none; // 데스크탑에서만 보임
    }
`;
