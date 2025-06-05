import styles from './ModalLayout.module.css';
import StoreSelectModal from '../select/StoreSelectModal';
import CloseIcon from '@/assets/icons/close-Icon.svg';
import DiscountSelectModal from '../select/DiscountSelectModal';
import CategourySelectModal from '../select/CategorySelectModal';

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

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContainer} onClick={stopPropagation}>
                <div className={styles.modalWrapper}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>{title}</h2>
                        <button className={styles.closeButton} onClick={onClose}>
                            <img src={CloseIcon} alt="닫기" />
                        </button>
                        <div className={styles.modalBody}>{renderContent()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
