import { useEffect, useState } from 'react';
import styles from './ProgressModal.module.css';

interface ProgressModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    message?: string;
}

// ProgressModal을 완전히 overlay 시스템으로 전환하고 메시지를 props로 받도록 수정
export const ProgressModal: React.FC<ProgressModalProps> = ({ isOpen, unmount, message = 'AI 추천 기능을 불러오고 있어요!' }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // 다음 프레임에서 visible 상태를 true로 설정하여 애니메이션 트리거
            requestAnimationFrame(() => {
                setIsVisible(true);
            });
        } else {
            setIsVisible(false);
            // 애니메이션이 끝난 후 unmount 호출
            const timer = setTimeout(() => {
                unmount();
            }, 300); // 애니메이션 duration과 맞춤
            return () => clearTimeout(timer);
        }
    }, [isOpen, unmount]);

    // 프로그레스 모달은 사용자가 임의로 닫을 수 없음
    const handleOverlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div 
            className={`${styles.overlay} ${isVisible ? styles.visible : ''}`}
            onClick={handleOverlayClick}
        >
            <div className={styles.modal}>
                <div className={styles.spinner} />
                <p className={styles.message}>{message}</p>
            </div>
        </div>
    );
};
