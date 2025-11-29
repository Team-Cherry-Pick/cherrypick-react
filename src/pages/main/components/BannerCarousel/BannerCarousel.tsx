import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BannerCarousel.module.css';
import mainBannerImg from '@/assets/banner/main-banner.jpg';
import interviewBannerImg from '@/assets/banner/interview-banner-pc.jpg';
import LeftArrowIcon from '@/assets/icons/left-arrow-Icon.svg?react';
import RightArrowIcon from '@/assets/icons/right-arrow-Icon.svg?react';

const banners = [
    {
        id: 1,
        image: mainBannerImg,
        alt: '메인 배너',
        link: '/join-beta',
    },
    {
        id: 2,
        image: interviewBannerImg,
        alt: '인터뷰 배너',
        link: 'https://forms.gle/KDRGg5vbtskoKWFZ7',
        external: true,
    },
];

export default function BannerCarousel() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
    };

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
    }, []);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const handleBannerClick = (banner: typeof banners[0]) => {
        if (banner.external) {
            window.open(banner.link, '_blank', 'noopener,noreferrer');
        } else {
            navigate(banner.link);
        }
    };

    // 자동 슬라이드
    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 5000); // 5초마다 자동 슬라이드

        return () => clearInterval(interval);
    }, [goToNext]);

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carouselWrapper}>
                {banners.map((banner, index) => (
                    <div 
                        key={banner.id} 
                        className={`${styles.bannerSlide} ${index === currentIndex ? styles.active : ''}`}
                    >
                        <button
                            type="button"
                            className={styles.bannerButton}
                            onClick={() => handleBannerClick(banner)}
                            aria-label={banner.alt}
                        >
                            <img src={banner.image} alt={banner.alt} className={styles.bannerImage} />
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="button"
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={goToPrevious}
                aria-label="이전 배너"
            >
                <LeftArrowIcon className={styles.arrowIcon} />
            </button>

            <button
                type="button"
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={goToNext}
                aria-label="다음 배너"
            >
                <RightArrowIcon className={styles.arrowIcon} />
            </button>

            <div className={styles.indicators}>
                {banners.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`배너 ${index + 1}로 이동`}
                    />
                ))}
            </div>
        </div>
    );
}
