import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styled from 'styled-components';
import { ReactNode } from 'react';

interface DefaultLayoutProps {
    children: ReactNode;
    background?: 'root' | 'board';
}

const DefaultLayout = ({ children, background = 'root' }: DefaultLayoutProps) => {
    return (
        <Wrapper $background={background}>
            <Inner>
                <Header background={background} />
                <Main>{children}</Main>
                <Footer background={background} />
            </Inner>
        </Wrapper>
    );
};

export default DefaultLayout;

const Wrapper = styled.div<{ $background: 'root' | 'board' }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme, $background }) => theme.colors.background[$background]};
  min-height: 100vh;

  @media (max-width: 1200px) {
    padding-inline: ${({ theme }) => theme.spacing[4]};
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: ${({ theme }) => theme.spacing[8]};
`;

const Inner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.spacing[20]};

  @media (max-width: 1200px) {
    padding-inline: ${({ theme }) => theme.spacing[4]};
  }
`;
