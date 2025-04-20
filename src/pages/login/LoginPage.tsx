// pages/login/LoginPage.tsx
import styled from 'styled-components';
import { textStyles } from '@/styles/global/typography';

const LoginPage = () => {
    return (
        <Container>
            <Title>로그인</Title>
        </Container>
    );
};

export default LoginPage;

const Title = styled.h1`
    ${textStyles.heading1}
    color: ${({ theme }) => theme.colors.content.main};
    margin-bottom: ${({ theme }) => theme.typography.size.xl};
`;

const Container = styled.div`
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.background.board};
    border: 1px solid ${({ theme }) => theme.colors.border.board};
`;
