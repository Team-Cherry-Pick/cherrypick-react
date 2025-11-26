import { useEffect } from 'react';
import styles from './InterviewBannerPopup.module.css';
import interviewBanner from '@/assets/banner/interview-banner.png';

interface InterviewBannerPopupProps {
    onClose: () => void;
}

export default function InterviewBannerPopup({ onClose }: InterviewBannerPopupProps) {
    useEffect(() => {
        // 현재 스크롤 위치 저장
        const scrollY = window.scrollY;

        // body 스크롤 방지
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // 컴포넌트 언마운트 시 원래대로 복구
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';

            // 원래 스크롤 위치로 복구
            window.scrollTo(0, scrollY);
        };
    }, []);

    const handleImageClick = () => {
        window.open('https://forms.gle/xdC749S98uU3uQBA8', '_blank', 'noopener,noreferrer');
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.container}>
                <button className={styles.closeButton} onClick={onClose}>
                    ✕
                </button>
                <img
                    src={interviewBanner}
                    alt="Interview Banner"
                    className={styles.bannerImage}
                    onClick={handleImageClick}
                />
            </div>
        </div>
    );
}
