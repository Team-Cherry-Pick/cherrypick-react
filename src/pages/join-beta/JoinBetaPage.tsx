import styles from './JoinBetaPage.module.css';
import DefaultLayout from '@/components/layout/DefaultLayout';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/styles/theme';
import { useEffect, useRef, useState } from 'react';

// 이미지 import
import BetaMainImg from '@/assets/banner/beta-main.svg';
import BetaDescFirstImg from '@/assets/banner/beta-desc-first.svg';
import BetaDescSecondImg from '@/assets/banner/beta-desc-second.svg';
import BetaDescThirdImg from '@/assets/banner/beta-desc-third.svg';
import BetaLastlyImg from '@/assets/banner/beta-lastly.svg';

// 쇼핑몰 아이콘 import
import ShoppingmallCoupang from '@/assets/banner/shoppingmall-coupang.svg';
import ShoppingmallLotteon from '@/assets/banner/shoppingmall-lotteon.svg';
import ShoppingmallEleven from '@/assets/banner/shoppingmall-eleven.svg';
import ShoppingmallAuction from '@/assets/banner/shoppingmall-auction.svg';
import ShoppingmallSsg from '@/assets/banner/shoppingmall-ssg.svg';
import ShoppingmallGmarket from '@/assets/banner/shoppingmall-gmarket.svg';
import Marquee from '@/components/common/Marquee';

const JoinBetaPage = () => {
    const isMobile = useIsMobileViewport();
    const [visibleItems, setVisibleItems] = useState<boolean[]>([false, false, false, false]);
    const descRef1 = useRef<HTMLDivElement>(null);
    const descRef2 = useRef<HTMLDivElement>(null);
    const descRef3 = useRef<HTMLDivElement>(null);
    const lastlyRef = useRef<HTMLDivElement>(null);
    const descRefs = [descRef1, descRef2, descRef3, lastlyRef];

    // 쇼핑몰 아이콘 배열 (확장 가능하도록 설계)
    const shoppingmallIcons = [
        { src: ShoppingmallCoupang, alt: 'Coupang' },
        { src: ShoppingmallLotteon, alt: 'Lotte On' },
        { src: ShoppingmallEleven, alt: '11st' },
        { src: ShoppingmallAuction, alt: 'Auction' },
        { src: ShoppingmallSsg, alt: 'SSG' },
        { src: ShoppingmallGmarket, alt: 'G Market' }
    ];

    // Join-Beta 페이지에서는 항상 light 테마 유지
    useEffect(() => {
        const originalTheme = document.documentElement.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', 'light');

        return () => {
            // 페이지를 떠날 때 원래 테마로 복구
            if (originalTheme) {
                document.documentElement.setAttribute('data-theme', originalTheme);
            }
        };
    }, []);

    // 스크롤 애니메이션을 위한 Intersection Observer
    useEffect(() => {
        const observers = descRefs.map((ref, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleItems(prev => {
                            const newVisible = [...prev];
                            newVisible[index] = true;
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
    }, []);

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

                            {/* Beta Lastly 이미지 */}
                            <div
                                ref={lastlyRef}
                                className={`${styles.lastlyBox} ${visibleItems[3] ? styles.visible : ''}`}
                            >
                                <img src={BetaLastlyImg} alt="Beta Lastly" className={styles.descriptionImage} />

                                {/* 무한 마키 효과 쇼핑몰 아이콘들 */}
                                <div className={styles.marqueeContainer}>
                                    <Marquee
                                        icons={shoppingmallIcons}
                                        height={48}
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