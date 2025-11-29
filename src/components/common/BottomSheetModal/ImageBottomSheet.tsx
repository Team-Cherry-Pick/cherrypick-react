import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './ImageBottomSheet.module.css';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';

interface ImageBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt?: string;
  onClick?: () => void;
  positiveButtonText?: string;
  negativeButtonText?: string;
  onPositiveClick?: () => void;
  onNegativeClick?: () => void;
}

const ImageBottomSheet = ({
  isOpen,
  onClose,
  imageUrl,
  alt = '배너 이미지',
  onClick,
  positiveButtonText,
  negativeButtonText,
  onPositiveClick,
  onNegativeClick,
}: ImageBottomSheetProps) => {
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

  const handleImageClick = () => {
    if (onClick) {
      onClick();
    }
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
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="닫기"
          >
            ✕
          </button>
          
          <img
            src={imageUrl}
            alt={alt}
            className={styles.image}
            onClick={handleImageClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
          />
          
          {/* 버튼 그룹 */}
          {(positiveButtonText || negativeButtonText) && (
            <div className={styles.buttonGroup}>
              {positiveButtonText && onPositiveClick && (
                <button
                  type="button"
                  className={`${styles.button} ${styles.positive}`}
                  onClick={onPositiveClick}
                >
                  {positiveButtonText}
                </button>
              )}
              
              {negativeButtonText && onNegativeClick && (
                <button
                  type="button"
                  className={`${styles.button} ${styles.negative}`}
                  onClick={onNegativeClick}
                >
                  {negativeButtonText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ImageBottomSheet;
