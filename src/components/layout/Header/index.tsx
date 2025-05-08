import styled from 'styled-components';
import Logo from '@/assets/icons/logo-Icon.svg';
import ProfileButton from '@/pages/profile-edit/ProfileButton';
interface HeaderProps {
    background?: 'root' | 'board';
}

const Header = ({ background = 'root' }: HeaderProps) => {
    return (
        <HeaderWrapper $background={background}>
            <HeaderContainer>
                <LogoWrapper onClick={() => (window.location.href = '/')}>
                    <LogoImg src={Logo} alt="logo" />
                    <LogoText>Repik</LogoText>
                </LogoWrapper>
                <ProfileButton/>
            </HeaderContainer>
        </HeaderWrapper>
    );
};

export default Header;

export const HeaderWrapper = styled.div<{ $background: 'root' | 'board' }>`
  width: 100%;
  background-color: ${({ theme, $background }) => theme.colors.background[$background]};
  position: relative;
  z-index: 10;
`;

export const HeaderContainer = styled.header`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  height: ${({ theme }) => theme.spacing[20]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: ${({ theme }) => theme.spacing[20]};
  padding-top: ${({ theme }) => theme.spacing[5]};

  @media (max-width: 1200px) {
    padding-inline: ${({ theme }) => theme.spacing[4]};
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.4;
  cursor: pointer;
`;

const LogoText = styled.div`
  padding-left: ${({ theme }) => theme.spacing[2]};
`;

const LogoImg = styled.img`
  width: ${({ theme }) => theme.spacing[8]};
  height: ${({ theme }) => theme.spacing[8]};
`;