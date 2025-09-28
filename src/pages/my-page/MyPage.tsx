import styles from './MyPage.module.css';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/styles/theme';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { currentProfileAtom } from '@/store/profile';
import { AccessTokenService } from '@/services/accessTokenService';
import { useRefreshProfile } from '@/hooks/useRefreshProfile';
import { GA4Events } from '@/utils/ga4';
import PersonIcon from '@/assets/icons/person-Icon.svg';
import RightArrowIcon from '@/assets/icons/right-arrow-Icon.svg?react';

const MyPage = () => {
    const navigate = useNavigate();
    const currentProfile = useAtomValue(currentProfileAtom);
    const { refreshProfile } = useRefreshProfile();
    const isLoggedIn = AccessTokenService.hasToken();

    // 로그인 체크
    useEffect(() => {
        if (!isLoggedIn) {
            alert('로그인이 필요한 페이지입니다.');
            navigate('/');
            return;
        }
        
        // 프로필 정보 새로고침
        refreshProfile();
    }, [isLoggedIn, navigate, refreshProfile]);

    // GA4 페이지뷰 트래킹
    useEffect(() => {
        GA4Events.pageView('/my-page', '마이페이지 조회');
    }, []);

    const handleEditProfile = () => {
        GA4Events.pageView('/my-page/edit-profile', '프로필 편집 페이지 이동');
        navigate('/profile-edit');
    };

    const handleViewMyDeals = () => {
        GA4Events.pageView('/my-page/my-deals', '내가 올린 딜 조회');
        // TODO: 내가 올린 딜 페이지로 이동 로직 추가
    };

    const handleViewLikedDeals = () => {
        GA4Events.pageView('/my-page/liked-deals', '좋아요한 딜 조회');
        // TODO: 좋아요한 딜 페이지로 이동 로직 추가
    };

    const handleSettings = () => {
        GA4Events.pageView('/my-page/settings', '설정 페이지 이동');
        // TODO: 설정 페이지로 이동 로직 추가
    };

    // 로그인되지 않은 경우 렌더링하지 않음
    if (!isLoggedIn) {
        return null;
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <div className={styles.lightThemeWrapper}>
                <DefaultLayout background="root">
                    <div className={styles.container}>
                        <div className={styles.contentWrapper}>
                            {/* 프로필 & 포인트몰 카드 */}
                            <div className={styles.profileCard}>
                                {/* 프로필 정보 섹션 */}
                                <div className={styles.profileSection} onClick={handleEditProfile}>
                                    <div className={styles.profileImageWrapper}>
                                        {currentProfile.imageURL ? (
                                            <img 
                                                src={currentProfile.imageURL} 
                                                alt="프로필 이미지" 
                                                className={styles.profileImage}
                                            />
                                        ) : (
                                            <div className={styles.defaultProfileImage}>
                                                <img src={PersonIcon} alt="기본 프로필" className={styles.personIcon} />
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className={styles.profileInfo}>
                                        <h2 className={styles.nickname}>{currentProfile.nickname || '닉네임 없음'}</h2>
                                        <p className={styles.email}>{currentProfile.email || '이메일 없음'}</p>
                                    </div>
                                    
                                    <RightArrowIcon className={styles.profileArrow} />
                                </div>

                                {/* 리픽 포인트몰 */}
                                <div className={styles.pointSection}>
                                    <div className={styles.pointIcon}>🎁</div>
                                    <span className={styles.pointText}>리픽 포인트몰</span>
                                    <span className={styles.pointBadge}>0P</span>
                                    <RightArrowIcon className={styles.pointArrow} />
                                </div>
                            </div>

                            {/* 활동 메뉴 카드 */}
                            <div className={styles.menuCard}>
                                <button className={styles.menuItem} onClick={handleViewMyDeals}>
                                    <div className={styles.menuIcon}>🔥</div>
                                    <span className={styles.menuText}>내가 찾은 할인</span>
                                    <RightArrowIcon className={styles.menuArrow} />
                                </button>
                                
                                <button className={styles.menuItem} onClick={handleViewLikedDeals}>
                                    <div className={styles.menuIcon}>❤️</div>
                                    <span className={styles.menuText}>추천한 할인</span>
                                    <RightArrowIcon className={styles.menuArrow} />
                                </button>
                                
                                <button className={styles.menuItem} onClick={handleSettings}>
                                    <div className={styles.menuIcon}>💬</div>
                                    <span className={styles.menuText}>댓글 단 할인</span>
                                    <RightArrowIcon className={styles.menuArrow} />
                                </button>
                            </div>

                            {/* 하단 메뉴 카드 */}
                            <div className={styles.bottomMenuCard}>
                                <button className={styles.bottomMenuItem}>
                                    <span className={styles.bottomMenuText}>개발자와 소통</span>
                                    <RightArrowIcon className={`${styles.bottomMenuArrow} ${styles.tertiary}`} />
                                </button>
                                
                                <button className={styles.bottomMenuItem}>
                                    <span className={styles.bottomMenuText}>공지사항</span>
                                    <RightArrowIcon className={`${styles.bottomMenuArrow} ${styles.tertiary}`} />
                                </button>
                                
                                <button className={styles.bottomMenuItem}>
                                    <span className={styles.bottomMenuText}>이용약관</span>
                                    <RightArrowIcon className={`${styles.bottomMenuArrow} ${styles.tertiary}`} />
                                </button>
                                
                                <button className={styles.bottomMenuItem} onClick={handleEditProfile}>
                                    <span className={styles.bottomMenuText}>개인정보 처리방침</span>
                                    <RightArrowIcon className={`${styles.bottomMenuArrow} ${styles.tertiary}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </DefaultLayout>
            </div>
        </ThemeProvider>
    );
};

export default MyPage;