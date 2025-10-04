import styles from './JoinBetaPage.module.css';
import DefaultLayout from '@/components/layout/DefaultLayout';
// import useIsMobileViewport from '@/hooks/useIsMobileViewport';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/styles/theme';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { currentProfileAtom } from '@/store/profile';
import { setBetaTesterIntent } from '@/store/betaTester';
import { AccessTokenService } from '@/services/accessTokenService';
import { postBetaTesterBadge, getBetaTesterBadgeCount } from '@/services/apiProfile';
import { useRefreshProfile } from '@/hooks/useRefreshProfile';
import { GA4Events } from '@/utils/ga4';
import { getAuthKakao } from '@/services/apiAuth';

// 이미지 import
import BetaMainImg from '@/assets/banner/beta-main.png';
import BetaDescFirstImg from '@/assets/banner/beta-desc-first.jpg';
import BetaDescSecondImg from '@/assets/banner/beta-desc-second.jpg';
import BetaDescThirdImg from '@/assets/banner/beta-desc-third.jpg';
import BetaLastlyImg from '@/assets/banner/beta-lastly.svg';

// 쇼핑몰 아이콘 import
import ShoppingmallCoupang from '@/assets/banner/shoppingmall-coupang.svg';
import ShoppingmallLotteon from '@/assets/banner/shoppingmall-lotteon.svg';
import ShoppingmallEleven from '@/assets/banner/shoppingmall-eleven.svg';
import ShoppingmallAuction from '@/assets/banner/shoppingmall-auction.svg';
import ShoppingmallSsg from '@/assets/banner/shoppingmall-ssg.svg';
import ShoppingmallGmarket from '@/assets/banner/shoppingmall-gmarket.svg';
import Marquee from '@/components/common/Marquee';
import { shareUrl } from '@/utils/share';

const JoinBetaPage = () => {
    // const isMobile = useIsMobileViewport();
    const navigate = useNavigate();

    // 페이지 진입 시 GA 이벤트 로깅
    useEffect(() => {
        GA4Events.pageView('/join-beta', '베타테스터 모집 페이지 진입');
    }, []);
    const [visibleItems, setVisibleItems] = useState<boolean[]>([false, false, false, false]);
    const descRef1 = useRef<HTMLDivElement>(null);
    const descRef2 = useRef<HTMLDivElement>(null);
    const descRef3 = useRef<HTMLDivElement>(null);
    const lastlyRef = useRef<HTMLDivElement>(null);
    const descRefs = useMemo(() => [descRef1, descRef2, descRef3, lastlyRef] as const, [descRef1, descRef2, descRef3, lastlyRef]);
    
    // 사용자 프로필 및 베타테스터 상태 관리
    const currentProfile = useAtomValue(currentProfileAtom);
    const { refreshProfile } = useRefreshProfile();
    const isLoggedIn = AccessTokenService.hasToken();
    const isBetaTester = currentProfile.badgeId === 2;

    // 베타테스터 카운트 상태 관리
    const [betaTesterCount, setBetaTesterCount] = useState(0);
    const [animatedCount, setAnimatedCount] = useState(0);

    // 쇼핑몰 아이콘 배열 (확장 가능하도록 설계)
    const shoppingmallIcons = [
        { src: ShoppingmallCoupang, alt: 'Coupang' },
        { src: ShoppingmallLotteon, alt: 'Lotte On' },
        { src: ShoppingmallEleven, alt: '11st' },
        { src: ShoppingmallAuction, alt: 'Auction' },
        { src: ShoppingmallSsg, alt: 'SSG' },
        { src: ShoppingmallGmarket, alt: 'G Market' }
    ];
    // 회원인 경우 프로필 새로고침
    useEffect(() => {
        if (isLoggedIn) {
            refreshProfile();
        }
    }, [isLoggedIn, refreshProfile]);

    // 스크롤 애니메이션을 위한 Intersection Observer
    useEffect(() => {
        const observers = descRefs.map((ref, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleItems(prev => {
                            const newVisible = [...prev];
                            newVisible[index] = true;
                            
                            // 각 섹션 조회 시 GA 이벤트 로깅
                            const sectionNames = ['first_description', 'second_description', 'third_description', 'cta_section'];
                            if (window.gtag) {
                                window.gtag('event', 'beta_page_section_view', {
                                    event_category: 'engagement',
                                    event_label: sectionNames[index],
                                    section_index: index + 1
                                });
                            }
                            
                            return newVisible;
                        });
                    }
                },
                {
                    threshold: 0.2,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            if (ref.current) {
                observer.observe(ref.current);
            }

            return observer;
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, [descRefs]);

    // 베타테스터 수 불러오기
    useEffect(() => {
        const fetchBetaTesterCount = async () => {
            try {
                const response = await getBetaTesterBadgeCount();
                console.log('API 응답:', response);
                const count = response.ownerCount;
                console.log('베타테스터 수:', count);
                setBetaTesterCount(count);
            } catch (error) {
                console.error('베타테스터 수 조회 실패:', error);
                // API 실패 시에도 테스트용으로 임시 숫자 설정
                setBetaTesterCount(42);
            }
        };

        fetchBetaTesterCount();
    }, []);

    // 카운팅 애니메이션 (20초마다 반복)
    useEffect(() => {
        console.log('betaTesterCount:', betaTesterCount);
        if (betaTesterCount === 0) return;

        const runCountingAnimation = () => {
            const duration = 1500; // 1초 동안 애니메이션 (더 빠르게)
            const steps = 60; // 60 프레임
            const increment = betaTesterCount / steps;
            let currentStep = 0;

            // 0부터 시작
            setAnimatedCount(0);

            const timer = setInterval(() => {
                currentStep++;
                const currentCount = Math.floor(increment * currentStep);
                console.log('애니메이션 진행:', currentCount);
                
                if (currentStep >= steps) {
                    setAnimatedCount(betaTesterCount);
                    clearInterval(timer);
                } else {
                    setAnimatedCount(currentCount);
                }
            }, duration / steps);

            return timer;
        };

        // 첫 번째 애니메이션 실행
        const firstTimer = runCountingAnimation();

        // 20초마다 반복 실행
        const repeatTimer = setInterval(() => {
            runCountingAnimation();
        }, 20000);

        return () => {
            clearInterval(firstTimer);
            clearInterval(repeatTimer);
        };
    }, [betaTesterCount]);

    // 베타테스터 신청 핸들러
    const handleBetaTesterApply = async () => {
        if (!isLoggedIn) {
            // 비로그인 사용자의 신청 시도 로깅
            GA4Events.pageView('/join-beta/apply-attempt-non-login', '비로그인 베타테스터 신청 시도');
            setBetaTesterIntent(true);
            getAuthKakao('/join-beta');
            return;
        }

        try {
            // 로그인 사용자의 신청 시작 로깅
            GA4Events.pageView('/join-beta/apply-start-login', '로그인 사용자 베타테스터 신청 시작');
            await postBetaTesterBadge();
            await refreshProfile(); // 프로필 새로고침으로 badgeId 업데이트
            
            // 베타테스터 신청 성공 로깅
            GA4Events.signUp('beta_tester');
            
            // 추가 성공 이벤트 (전환율 측정용)
            if (window.gtag) {
                window.gtag('event', 'beta_tester_conversion', {
                    event_category: 'conversion',
                    event_label: 'beta_tester_signup_success',
                    value: 1
                });
            }
            
            alert('베타테스터 신청이 완료되었습니다!');
        } catch (error) {
            console.error('베타테스터 신청 실패:', error);
            
            // 베타테스터 신청 실패 로깅
            GA4Events.exception('beta_tester_apply_failed', '베타테스터 신청 실패');
            
            // 추가 실패 이벤트 (전환율 측정용)
            if (window.gtag) {
                window.gtag('event', 'beta_tester_conversion_failed', {
                    event_category: 'conversion',
                    event_label: 'beta_tester_signup_failed',
                    value: 0
                });
            }
            
            alert('베타테스터 신청에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <div className={styles.lightThemeWrapper}>
                <DefaultLayout background="root">
                    <div className={styles.container}>
                        <div className={styles.contentWrapper}>
                            {/* Main 이미지 */}
                            <div className={styles.mainImageWrapper}>
                                <img src={BetaMainImg} alt="Beta Main" className={styles.mainImage} />
                            </div>

                            {/* 서비스 소개 텍스트 */}
                            <div className={styles.serviceIntroBox}>
                                <p className={styles.serviceIntroText}>
                                    서비스 소개<br />
                                </p>
                            </div>

                            {/* Description 이미지들 */}
                            <div className={styles.descriptionContainer}>
                                <div
                                    ref={descRef1}
                                    className={`${styles.descriptionBox} ${visibleItems[0] ? styles.visible : ''}`}
                                >
                                    <img src={BetaDescFirstImg} alt="Beta Description 1" className={styles.descriptionImage} />
                                </div>

                                <div
                                    ref={descRef2}
                                    className={`${styles.descriptionBox} ${visibleItems[1] ? styles.visible : ''}`}
                                >
                                    <img src={BetaDescSecondImg} alt="Beta Description 2" className={styles.descriptionImage} />
                                </div>

                                <div
                                    ref={descRef3}
                                    className={`${styles.descriptionBox} ${visibleItems[2] ? styles.visible : ''}`}
                                >
                                    <img src={BetaDescThirdImg} alt="Beta Description 3" className={styles.descriptionImage} />
                                </div>
                            </div>

                            {/* 베타테스터 모집 텍스트 */}
                            <div className={styles.betaRecruitBox}>
                                <p className={styles.serviceIntroText}>
                                    베타테스터 모집<br />
                                </p>
                            </div>

                            {/* 베타테스터 신청자 수 표시 */}
                            {animatedCount >= 0 && (
                                <div className={styles.countSection}>
                                    <p className={styles.countText}>
                                        지금까지 <span className={styles.countNumber}>{(animatedCount || 0).toLocaleString()}</span>명의 베타테스터가 신청했어요!
                                    </p>
                                </div>
                            )}

                            {/* Beta Lastly 이미지 */}
                            <div
                                ref={lastlyRef}
                                className={`${styles.lastlyBox} ${visibleItems[3] ? styles.visible : ''}`}
                            >
                                <img src={BetaLastlyImg} alt="Beta Lastly" className={styles.descriptionImage} />

                                {/* 액션 버튼 3종 */}
                                <div className={styles.actionButtons}>
                                    <button 
                                        type="button" 
                                        className={`${styles.actionButton} ${styles.primary}`}
                                        aria-label="베타테스터 신청"
                                        disabled={isLoggedIn && isBetaTester}
                                        onClick={handleBetaTesterApply}
                                    >
                                        {isLoggedIn && isBetaTester ? '이미 베타테스터입니다.' : '테스터 신청 (로그인)'}
                                    </button>
                                    <button
                                        type="button"
                                        className={`${styles.actionButton} ${styles.secondary}`}
                                        aria-label="친구한테 공유하기"
                                        onClick={() => {
                                            // 베타페이지 공유 이벤트 로깅
                                            GA4Events.shareDeal(0, 'beta_page_share');
                                            
                                            // 추가 공유 이벤트 (참여도 측정용)
                                            if (window.gtag) {
                                                window.gtag('event', 'beta_page_share_action', {
                                                    event_category: 'engagement',
                                                    event_label: 'share_button_click',
                                                    value: 1
                                                });
                                            }
                                            
                                            shareUrl(window.location.href, {
                                                title: document.title || '체리픽',
                                                text: '리픽 베타테스터 신청 페이지를 공유합니다',
                                                showAlerts: true,
                                            });
                                        }}
                                    >
                                        친구한테 공유
                                    </button>
                                    <button
                                        type="button"
                                        className={`${styles.actionButton} ${styles.secondary}`}
                                        aria-label="메인페이지 이동"
                                        onClick={() => {
                                            // 메인페이지 이동 이벤트 로깅
                                            GA4Events.pageView('/join-beta/navigate-main', '베타페이지에서 메인으로 이동');
                                            
                                            // 추가 이동 이벤트 (이탈률 측정용)
                                            if (window.gtag) {
                                                window.gtag('event', 'beta_page_exit_to_main', {
                                                    event_category: 'navigation',
                                                    event_label: 'main_page_button_click',
                                                    value: 1
                                                });
                                            }
                                            
                                            navigate('/');
                                        }}
                                    >
                                        메인페이지 이동
                                    </button>
                                </div>
                            </div>

                            <div
                                className={`${styles.marqueeBox} ${visibleItems[3] ? styles.visible : ''}`}
                            >
                                {/* 무한 마키 효과 쇼핑몰 아이콘들 */}
                                <div className={styles.marqueeContainer}>
                                    <Marquee
                                        icons={shoppingmallIcons}
                                        height={60}
                                        gap={16}
                                        durationSec={16}
                                        direction="ltr"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </DefaultLayout>
            </div>
        </ThemeProvider>
    );
};

export default JoinBetaPage;