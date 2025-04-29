import styled from 'styled-components';
import Logo from '@/assets/icons/black-logo-Icon.svg';
interface FooterProps {
    background?: 'root' | 'board';
}

const Footer = ({ background = 'root' }: FooterProps) => {
    return (
        <FooterContainer $background={background}>
            <FooterContent>
                <LogoSection>
                    <LogoImg src={Logo} alt="logo" />
                    <ServiceName>Repik</ServiceName>
                </LogoSection>
                <LinkList>
                    <span>서비스소개</span>
                    <Divider>|</Divider>
                    <span>공지사항</span>
                    <Divider>|</Divider>
                    <span>이용약관</span>
                    <Divider>|</Divider>
                    <span>개인정보처리방침</span>
                </LinkList>
                <CopyNotice>©Copyright 2025. Repik. All Right Reserved</CopyNotice>
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer;

const FooterContainer = styled.footer<{ $background: 'root' | 'board' }>`
 position: relative;
 z-index: 10;
  max-width: ${({ theme }) => theme.maxWidth};
  margin-inline: auto;
  background-color: ${({ theme, $background }) => theme.colors.background[$background]};
  padding-inline: ${({ theme }) => theme.spacing[20]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing[10]};
  @media (max-width: 1200px) {
    padding-inline: ${({ theme }) => theme.spacing[4]};
  }
`;

const FooterContent = styled.div`
  max-width: 1024px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const LogoImg = styled.img`
  width: ${({ theme }) => theme.spacing[8]};
  height: ${({ theme }) => theme.spacing[8]};
`;

const ServiceName = styled.div`
  color: ${({ theme }) => theme.colors.content.tertiary};
  font-size: 1.75rem;
  font-weight: 700;
`;

const LinkList = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

const Divider = styled.span`
  margin: 0 ${({ theme }) => theme.spacing[1]};
`;

const CopyNotice = styled.div`
  color: ${({ theme }) => theme.colors.content.tertiary};
  font-size: ${({ theme }) => theme.typography.size.xs};
`;
