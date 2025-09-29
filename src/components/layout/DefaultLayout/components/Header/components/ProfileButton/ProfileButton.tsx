import styles from './ProfileButton.module.css'
import PersonIcon from '@/assets/icons/person-Icon.svg?react';
import { AccessTokenService } from '@/services/accessTokenService';
import { useNavigate } from 'react-router-dom';
import { currentProfileAtom } from '@/store/profile';
import { useAtomValue } from 'jotai';
import { GA4Events } from '@/utils/ga4';

const ProfileButton = () => {
    const navigate = useNavigate();
    const isLoggedIn = () => AccessTokenService.hasToken();
    const currentProfile = useAtomValue(currentProfileAtom);

    // 프로필 버튼 클릭 시 호출
    const onClickBtnProfile = () => {
        GA4Events.pageView('/my-page', '헤더 프로필 버튼에서 마이페이지 이동');
        navigate('/my-page');
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
