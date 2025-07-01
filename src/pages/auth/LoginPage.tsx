// pages/login/LoginPage.tsx
import styled from 'styled-components';
import DefaultLayout from '@/components/layout/DefaultLayout';
import LoginBox from './LoginBox';

const LoginPage = () => {
    return (
        <DefaultLayout>
            <Container>
                <LoginBox />
            </Container>
        </DefaultLayout>
    );
};

export default LoginPage;

const Container = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;
