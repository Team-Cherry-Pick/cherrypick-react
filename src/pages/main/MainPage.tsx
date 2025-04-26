import styled from 'styled-components';
import DefaultLayout from '@/components/layout/DefaultLayout';
import MainSearchBar from './MainSearchBar';
import MainDealList from './MainDealList';
import MainFilter from './MainFilter';
import SortButtons from './SortButtons';
import UploadBtn from '@/components/common/Floating/UploadBtn';
import ScrollTopBtn from '@/components/common/Floating/ScrollTopBtn';

const MainPage = () => {
    return (
        <DefaultLayout>
            <MainSearchWrapper>
                <MainSearchBar />
            </MainSearchWrapper>

            <SortRow>
                <SortButtons />
            </SortRow>

            <ContentWrapper>
                <MainFilter />
                <MainDealList />
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
`;

const SortRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
