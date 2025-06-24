import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styled from 'styled-components';

interface DefaultLayoutProps {
    children: ReactNode;
    background?: 'root' | 'board';
}

const DefaultLayout = ({ children, background = 'root' }: DefaultLayoutProps) => {
    const location = useLocation();
    const isFullWidth = location.pathname === '/upload';

    return (
        <Wrapper $background={background}>
            <Header background={background} />
            <Main>
                <Inner $fullWidth={isFullWidth}>
                    {children}
                </Inner>
            </Main>
            <Footer background={background} />
        </Wrapper>
    );
};

export default DefaultLayout;

const Wrapper = styled.div<{ $background: 'root' | 'board' }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme, $background }) => theme.colors.background[$background]};
  min-height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: ${({ theme }) => theme.spacing[8]};
`;

const Inner = styled.div<{ $fullWidth?: boolean }>`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-inline: auto;
`;
