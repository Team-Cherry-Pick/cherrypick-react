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
import Logo from '@/assets/icons/black-logo-Icon.svg?react';

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
        alert('서비스 준비 중입니다');
    };

    const handleViewLikedDeals = () => {
        GA4Events.pageView('/my-page/liked-deals', '좋아요한 딜 조회');
        alert('서비스 준비 중입니다');
    };

    const handleSettings = () => {
        GA4Events.pageView('/my-page/settings', '설정 페이지 이동');
        alert('서비스 준비 중입니다');
    };

    const handleNotice = () => {
        GA4Events.pageView('/my-page/notice', '공지사항 페이지 이동');
        window.open('https://repik-help.notion.site/', '_blank', 'noopener,noreferrer');
    };

    const handleTerms = () => {
        GA4Events.pageView('/my-page/terms', '이용약관 페이지 이동');
        window.open('https://repik-help.notion.site/terms-of-services', '_blank', 'noopener,noreferrer');
    };

    const handlePrivacy = () => {
        GA4Events.pageView('/my-page/privacy', '개인정보처리방침 페이지 이동');
        window.open('https://repik-help.notion.site/privacy-policy', '_blank', 'noopener,noreferrer');
    };

    const handleCommunication = () => {
        GA4Events.pageView('/my-page/communication', '리픽 운영진과의 소통 페이지 이동');
        window.open('http://pf.kakao.com/_TwEUn/chat', '_blank', 'noopener,noreferrer');
    };

    const handleServiceInfo = () => {
        GA4Events.pageView('/my-page/service-info', '서비스 소개 & 베타테스터 신청 페이지 이동');
        navigate('/join-beta');
    };

    const handleLogout = () => {
        if (!isLoggedIn) return;
        
        const confirmed = window.confirm('정말 로그아웃하시겠어요?');
        if (!confirmed) return;

        GA4Events.logout();
        AccessTokenService.clear();
        navigate('/');
        refreshProfile();
        alert('정상적으로 로그아웃되었습니다.');
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
                                    
                                    {/* 서비스 준비중 오버레이 */}
                                    <div className={styles.pointOverlay}>
                                        <div className={styles.overlayContent}>
                                            <button className={styles.betaApplyButton} onClick={handleServiceInfo}>베타테스터 신청</button>
                                        </div>
                                    </div>
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
                                <button className={styles.bottomMenuItem} onClick={handleCommunication}>
                                    <span className={styles.bottomMenuText}>리픽 운영진과의 소통</span>
                                    <RightArrowIcon className={`${styles.bottomMenuArrow} ${styles.tertiary}`} />
                                </button>
                                
                                <button className={styles.bottomMenuItem} onClick={handleNotice}>
                                    <span className={styles.bottomMenuText}>공지사항</span>
                                    <RightArrowIcon className={`${styles.bottomMenuArrow} ${styles.tertiary}`} />
                                </button>
                                
                                <button className={styles.bottomMenuItem} onClick={handleTerms}>
                                    <span className={styles.bottomMenuText}>이용약관</span>
                                    <RightArrowIcon className={`${styles.bottomMenuArrow} ${styles.tertiary}`} />
                                </button>
                                
                                <button className={styles.bottomMenuItem} onClick={handlePrivacy}>
                                    <span className={styles.bottomMenuText}>개인정보 처리방침</span>
                                    <RightArrowIcon className={`${styles.bottomMenuArrow} ${styles.tertiary}`} />
                                </button>
                            </div>

                            {/* 계정 카드 */}
                            <div className={styles.accountMenuCard}>
                                <button className={styles.accountMenuItem} onClick={handleLogout}>
                                    <span className={styles.accountMenuText}>로그아웃</span>
                                </button>
                            </div>

                            {/* 푸터 섹션 */}
                            <div className={styles.footerSection}>
                                <div className={styles.footerContent}>
                                    <div className={styles.logoSection}>
                                        <Logo className={styles.logoImg} />
                                        <div className={styles.serviceName}>Repik</div>
                                    </div>
                                    <div className={styles.copyNotice}>©Copyright 2025. Repik. All Right Reserved</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DefaultLayout>
            </div>
        </ThemeProvider>
    );
};

export default MyPage;