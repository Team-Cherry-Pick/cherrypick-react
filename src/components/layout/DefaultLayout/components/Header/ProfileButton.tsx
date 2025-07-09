import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PersonIcon from '@/assets/icons/person-Icon.svg';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';
import { useNavigate } from 'react-router-dom';
import { currentProfileAtom } from '@/store/profile';
import { useAtomValue } from 'jotai';
import { useRefreshProfile } from '@/hooks/useRefreshProfile';

const ProfileButton = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const isLoggedIn = () => AccessTokenService.hasToken(AccessTokenType.USER);
    const currentProfile = useAtomValue(currentProfileAtom);
    const { refreshProfile } = useRefreshProfile();

    // 전체 영역 클릭 시 호출
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 프로필 버튼 클릭 시 호출
    const onClickBtnProfile = () => {
        if (isLoggedIn()) {
            setOpen((prev) => !prev);
        } else {
            navigate('/login');
        }
    };

    // '회원정보 수정' 버튼 클릭 시 호출
    const onClickBtnProfileEdit = () => {
        if (!isLoggedIn) return;
        navigate('/profile-edit');
    }

    // '로그아웃' 버튼 클릭 시 호출
    const onClickLogout = () => {
        if (!isLoggedIn) return;
        AccessTokenService.clear(AccessTokenType.USER);
        navigate('/');
        setOpen(false);
        refreshProfile();
    }

    return (
        <Wrapper ref={menuRef}>
            {/* 프로필 버튼 */}
            <ProfileIcon onClick={() => onClickBtnProfile()}>
                <IconWrapper>
                    <img src={currentProfile?.imageURL || PersonIcon} alt="user" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}/>
                </IconWrapper>
            </ProfileIcon>
            {/* 드롭다운 메뉴 */}
            {open && (
                <DropdownMenu>
                    <MenuItem onClick={() => onClickBtnProfileEdit()}>회원정보 수정</MenuItem>
                    <MenuItem onClick={() => onClickLogout()}>로그아웃</MenuItem>
                </DropdownMenu>
            )}
        </Wrapper>
    );
};

export default ProfileButton;

const Wrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    width: 160px;
    border: 1px solid ${({ theme }) => theme.colors.border.card};
    background-color: ${({ theme }) => theme.colors.background.card};
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    z-index: 1000;
`;

const MenuItem = styled.button`
    width: 100%;
    height: 48px;
    background: none;
    border: none;
    text-align: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.content.sub};
    &:hover {
        color: ${({ theme }) => theme.colors.content.main};
        background-color: ${({ theme }) => theme.colors.neutral[100]};
    }
`;

const ProfileIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
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