import styles from './ProfileButton.module.css'
import { useState, useRef, useEffect } from 'react';
import PersonIcon from '@/assets/icons/person-Icon.svg?react';
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
            setOpen(prev => !prev);
        } else {
            navigate('/login');
        }
    };

    // '회원정보 수정' 버튼 클릭 시 호출
    const onClickBtnProfileEdit = () => {
        if (!isLoggedIn()) return;
        navigate('/profile-edit');
        setOpen(false);
    };

    // '로그아웃' 버튼 클릭 시 호출
    const onClickLogout = () => {
        if (!isLoggedIn()) return;
        AccessTokenService.clear(AccessTokenType.USER);
        navigate('/');
        setOpen(false);
        refreshProfile();
        alert('정상적으로 로그아웃되었습니다.');
    };

    return (
        <div className={styles.wrapper} ref={menuRef}>
            {/* 프로필 버튼 */}
            <button
                type="button"
                className={styles.profileIcon}
                onClick={onClickBtnProfile}
                aria-haspopup="true"
                aria-expanded={open}
            >
                <div className={styles.iconWrapper}>
                    {currentProfile?.imageURL ? (
                        <img
                            src={currentProfile.imageURL}
                            alt="user"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                        />
                    ) : (
                        <PersonIcon className={styles.personIcon} />
                    )}
                </div>
            </button>

            {/* 드롭다운 메뉴 */}
            {open && (
                <div className={styles.dropdownMenu} role="menu">
                    <button type="button" className={styles.menuItem} onClick={onClickBtnProfileEdit}>
                        회원정보 수정
                    </button>
                    <button type="button" className={styles.menuItem} onClick={onClickLogout}>
                        로그아웃
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileButton;
