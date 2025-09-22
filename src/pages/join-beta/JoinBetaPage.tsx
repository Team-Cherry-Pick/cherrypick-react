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

const JoinBetaPage = () => {
    const isMobile = useIsMobileViewport();
    const [visibleItems, setVisibleItems] = useState<boolean[]>([false, false, false]);
    const descRef1 = useRef<HTMLDivElement>(null);
    const descRef2 = useRef<HTMLDivElement>(null);
    const descRef3 = useRef<HTMLDivElement>(null);
    const descRefs = [descRef1, descRef2, descRef3];

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
                <DefaultLayout background="board">
                    <div className={styles.container}>
                        <div className={styles.contentWrapper}>
                            {/* Main 이미지 */}
                            <div className={styles.mainImageWrapper}>
                                <img src={BetaMainImg} alt="Beta Main" className={styles.mainImage} />
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
                        </div>
                    </div>
                </DefaultLayout>
            </div>
        </ThemeProvider>
    );
};

export default JoinBetaPage;