import styles from './ModalLayout.module.css';
import StoreSelectModal from '../select/StoreSelectModal';
import CloseIcon from '@/assets/icons/close-Icon.svg';
import DiscountSelectModal from '../select/DiscountSelectModal';
import CategourySelectModal from '../select/CategorySelectModal';
import { useEffect } from 'react';

interface ModalLayoutProps {
    title: '스토어 선택' | '카테고리 선택' | '할인방식 선택';
    onClose: () => void;
}

export default function ModalLayout({ title, onClose }: ModalLayoutProps) {
    const renderContent = () => {
        switch (title) {
            case '스토어 선택':
                return <StoreSelectModal onClose={onClose} />;
            case '카테고리 선택':
                return <CategourySelectModal onClose={onClose} />;
            case '할인방식 선택':
                return <DiscountSelectModal onClose={onClose} />;
            default:
                return null;
        }
    };

    const handleOverlayClick = () => {
        onClose();
    };

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

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

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div
                className={`${styles.modalWrapper} ${title === '할인방식 선택' && styles.longModal}`}
                onClick={stopPropagation}
            >
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{title}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <img src={CloseIcon} alt="닫기" />
                    </button>
                </div>
                <div className={styles.modalBody}>{renderContent()}</div>
            </div>
        </div>
    );
}
