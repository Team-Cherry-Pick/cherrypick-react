import styled from 'styled-components';
import { useAtomValue, useSetAtom } from 'jotai';
import { authTokenAtom } from '@/store/auth';
import { themeAtom } from '@/store/theme';
import PersonIcon from '@/assets/icons/person-Icon.svg';
import { Moon } from 'lucide-react';
import Logo from '@/assets/icons/logo-Icon.svg';

interface HeaderProps {
    background?: 'root' | 'board';
}

const Header = ({ background = 'root' }: HeaderProps) => {
    const token = useAtomValue(authTokenAtom);
    const setTheme = useSetAtom(themeAtom);
    const isLoggedIn = !!token;

    const handleProfileClick = () => {
        if (!isLoggedIn) {
            window.location.href = '/login';
        } else {
            console.log('유저 프로필 보기');
        }
    };

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <HeaderWrapper $background={background}>
            <HeaderContainer>
                <LogoWrapper onClick={() => (window.location.href = '/')}>
                    <LogoImg src={Logo} alt="logo" />
                    <LogoText>Repik</LogoText>
                </LogoWrapper>
                <PersonalContainer>
                    <ThemeToggleIcon onClick={toggleTheme} />
                    <ProfileIcon onClick={handleProfileClick}>
                        <IconWrapper>
                            <img src={PersonIcon} alt="user" />
                        </IconWrapper>
                    </ProfileIcon>
                </PersonalContainer>
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

const ProfileIcon = styled.div`
  width: ${({ theme }) => theme.spacing[8]};
  height: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radius[4]};
  border: 1px solid ${({ theme }) => theme.colors.content.tertiary};
  background-color: ${({ theme }) => theme.colors.background.card};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PersonalContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ThemeToggleIcon = styled(Moon)`
  width: ${({ theme }) => theme.spacing[8]};
  height: ${({ theme }) => theme.spacing[8]};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.content.tertiary};
`;
