import styles from './ProfileButton.module.css'
import PersonIcon from '@/assets/icons/person-Icon.svg?react';
import { AccessTokenService } from '@/services/accessTokenService';
import { useNavigate } from 'react-router-dom';
import { currentProfileAtom } from '@/store/profile';
import { useAtomValue } from 'jotai';
import { GA4Events } from '@/utils/ga4';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';

const ProfileButton = () => {
    const navigate = useNavigate();
    const isLoggedIn = () => AccessTokenService.hasToken();
    const currentProfile = useAtomValue(currentProfileAtom);
    const isMobile = useIsMobileViewport();

    // 프로필 버튼 클릭 시 호출
    const onClickBtnProfile = () => {
        if (!isLoggedIn() && !isMobile) {
            GA4Events.pageView('/login', '헤더 베타 로그인 버튼 클릭 (PC)');
            navigate('/login');
            return;
        }
    };



    return (
        <div className={styles.wrapper}>
            {/* 프로필 버튼 */}
            <button
                type="button"
                className={styles.profileIcon}
                onClick={onClickBtnProfile}
            >
                {isLoggedIn() ? (
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
                ) : (
                    <span className={styles.loginText}>베타 로그인</span>
                )}
            </button>
        </div>
    );
};

export default ProfileButton;
