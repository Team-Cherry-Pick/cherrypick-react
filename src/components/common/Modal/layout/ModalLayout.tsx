import * as S from './modal.style';
import CloseIcon from '@/assets/icons/close-Icon.svg';
import { StoreSelectModal } from '@/components/common/Modal/select/StoreSelectModal';
import { CategorySelectModal } from '@/components/common/Modal/select/category/CategorySelectModal';
import { DiscountSelectModal } from '@/components/common/Modal/select/DiscountSelectModal';

interface ModalLayoutProps {
    title: '스토어 선택' | '카테고리 선택' | '할인방식 선택';
    onClose: () => void;
}

export function ModalLayout({ title, onClose }: ModalLayoutProps) {
    const renderContent = () => {
        switch (title) {
            case '스토어 선택':
                return <StoreSelectModal onClose={onClose} />;
            case '카테고리 선택':
                return <CategorySelectModal onClose={onClose} />;
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
        <S.ModalOverlay onClick={handleOverlayClick}>
            <S.ModalContainer onClick={stopPropagation}>
                <S.ModalWrapper>
                    <S.ModalHeader>
                        <S.ModalTitle>{title}</S.ModalTitle>
                        <S.CloseButton onClick={onClose}>
                            <img src={CloseIcon} alt="닫기" />
                        </S.CloseButton>
                    </S.ModalHeader>
                    <S.ModalBody>{renderContent()}</S.ModalBody>
                </S.ModalWrapper>
            </S.ModalContainer>
        </S.ModalOverlay>
    );
}
