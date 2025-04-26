import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styled from 'styled-components';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
    return (
        <Wrapper>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </Wrapper>
    );
};

export default DefaultLayout;

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.spacing[20]};
  background-color: ${({ theme }) => theme.colors.background.root};

  @media (max-width: 1200px) {
    padding-inline: ${({ theme }) => theme.spacing[4]};
  }
`;

const Main = styled.main`
  padding-top: ${({ theme }) => theme.spacing[8]};
`;
