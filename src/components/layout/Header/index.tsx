import styled from 'styled-components';
import { useAtomValue } from 'jotai';
import { authTokenAtom } from '@/store/auth';
import PersonIcon from '@/assets/icons/person-Icon.svg';
import Logo from '@/assets/icons/logo-Icon.svg';

const Header = () => {
    const token = useAtomValue(authTokenAtom);
    const isLoggedIn = !!token;

    const handleProfileClick = () => {
        if (!isLoggedIn) {
            window.location.href = '/login';
        } else {
            console.log('유저 프로필 보기');
        }
    };

    return (
        <HeaderContainer>
            <LogoWrapper onClick={() => (window.location.href = '/')}>
                <LogoImg src={Logo} alt="logo" />
                <LogoText>Repik</LogoText>
            </LogoWrapper>
            <ProfileIcon onClick={handleProfileClick}>
                <IconWrapper>
                    <img src={PersonIcon} alt="user" />
                </IconWrapper>
            </ProfileIcon>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.header`
  width: 100%;
  height: ${({ theme }) => theme.spacing[16]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.background.root};
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
