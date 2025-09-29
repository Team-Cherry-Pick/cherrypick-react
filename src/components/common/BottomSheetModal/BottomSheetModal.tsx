import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './BottomSheetModal.module.css';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';
import KakaoIcon from '@/assets/icons/kakao-Icon.svg?react';

interface BottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  emoji?: string;
  title: string;
  content: string | ReactNode;
  positiveButtonText: string;
  negativeButtonText: string;
  onPositiveClick: () => void;
  onNegativeClick: () => void;
}

const BottomSheetModal = ({
  isOpen,
  onClose,
  emoji,
  title,
  content,
  positiveButtonText,
  negativeButtonText,
  onPositiveClick,
  onNegativeClick,
}: BottomSheetModalProps) => {
  const isMobile = useIsMobileViewport();

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const renderEmoji = () => {
    if (!emoji) return null;
    
    return <div className={styles.emojiWrapper}>{emoji}</div>;
  };

  const modalContent = (
    <div className={`${styles.overlay} ${isMobile ? styles.mobile : styles.desktop}`}>
      <div 
        className={styles.backdrop}
        onClick={onClose}
        aria-label="모달 닫기"
      />
      <div className={`${styles.modal} ${isMobile ? styles.bottomSheet : styles.popup}`}>
        {/* 모바일 상단 핸들 */}
        {isMobile && <div className={styles.handle} />}
        
        <div className={styles.content}>
          {/* 이모지 */}
          {renderEmoji()}
          
          {/* 제목 */}
          <h2 className={styles.title}>{title}</h2>
          
          {/* 내용 */}
          <div className={styles.description}>
            {typeof content === 'string' ? (
              <p>{content}</p>
            ) : (
              content
            )}
          </div>
          
          {/* 버튼들 */}
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={`${styles.button} ${styles.positive}`}
              onClick={onPositiveClick}
            >
              <KakaoIcon className={styles.kakaoIcon} />
              {positiveButtonText}
            </button>
            
            <button
              type="button"
              className={`${styles.button} ${styles.negative}`}
              onClick={onNegativeClick}
            >
              {negativeButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default BottomSheetModal;