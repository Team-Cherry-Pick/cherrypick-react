// pages/login/LoginBox.tsx
import styled from 'styled-components';
import RepikLogo from '@/assets/icons/logo-Icon.svg';
import KakaoLogo from '@/assets/icons/kakao-Icon.svg';
import { textStyles } from '@/styles/global/typography';
import { getAuthKakao } from '@/services/apiSign';

const LoginPage = () => {
    return (
        <LoginBoxWrapper>
            <LogoWrapper>
                <RepikLogoImg src={RepikLogo} alt="logo" />
                <RepikLogoText>Repik</RepikLogoText>
            </LogoWrapper>
            <Title>
                진짜 혜택만 다시 고르다. <HighlightBold>리픽</HighlightBold>
            </Title>
            <Divider />
            <Message>
                리픽은 <HighlightColor>1인 1계정</HighlightColor>을 원칙으로 하며
                <br />
                중복계정에 따른 업자 문제를 방지합니다.
            </Message>
            <KakaoLoginButton onClick={() => getAuthKakao('/')}>
                <KakaoLoginLogoImage src={KakaoLogo} alt="kakao login" />
                <KakaoLoginText>카카오 로그인/회원가입</KakaoLoginText>
            </KakaoLoginButton>
        </LoginBoxWrapper>
    );
};

export default LoginPage;

const LoginBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 380px;
    height: auto;
    border: 1px solid ${({ theme }) => theme.colors.border.board};
    display: flex;
    align-items: center;
    border-radius: 20px;
    padding: 48px 32px 32px 32px;
    background-color: ${({ theme }) => theme.colors.background.card};
`;

const LogoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: ${({ theme }) => theme.colors.content.main};
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.4;
    cursor: pointer;
`;

const RepikLogoImg = styled.img`
    width: ${({ theme }) => theme.spacing[12]};
    height: ${({ theme }) => theme.spacing[12]};
`;

const RepikLogoText = styled.div`
    padding-left: ${({ theme }) => theme.spacing[2]};
`;

const Title = styled.p`
    ${textStyles.body}
    font-size: 20px;
    color: ${({ theme }) => theme.colors.content.main};
`;

const HighlightBold = styled.span`
    font-weight: 600;
`;

const Divider = styled.div`
    width: 100%;
    height: 0.5px;
    margin-top: 32px;
    background-color: ${({ theme }) => theme.colors.border.board};
`;

const Message = styled.p`
    ${textStyles.body}
    width: 100%;
    margin-top: 20px;
    text-align: start;
    color: ${({ theme }) => theme.colors.content.sub};
`;

const HighlightColor = styled.span`
    color: ${({ theme }) => theme.colors.primary};
`;

const KakaoLoginButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 48px;
    margin-top: 16px;
    border-radius: ${({ theme }) => theme.radius[2]};
    background-color: #fee502;
    color: ${({ theme }) => theme.colors.neutral[500]};
    cursor: pointer;
    gap: 16px;
`;

const KakaoLoginLogoImage = styled.img`
    width: ${({ theme }) => theme.spacing[6]};
    height: ${({ theme }) => theme.spacing[6]};
`;

const KakaoLoginText = styled.p`
    ${textStyles.subtitle}
    font-size: 18px;
    color: #392020;
`;
