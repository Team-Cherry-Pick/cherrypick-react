import * as S from './modal.style';
import CloseIcon from '@/assets/icons/close-Icon.svg';
import { StoreSelectModal } from '@/components/common/Modal/select/StoreSelectModal';
import { CategorySelectModal } from '@/components/common/Modal/select/category/CategorySelectModal';
import { DiscountSelectModal } from '@/components/common/Modal/select/DiscountSelectModal';

interface ModalLayoutProps {
    title: '스토어 선택' | '카테고리 선택' | '할인방식 선택';
}

export function ModalLayout({ title }: ModalLayoutProps) {
    const renderContent = () => {
        switch (title) {
            case '스토어 선택':
                return <StoreSelectModal />;
            case '카테고리 선택':
                return <CategorySelectModal />;
            case '할인방식 선택':
                return <DiscountSelectModal />;
            default:
                return null;
        }
    };

    const handleClose = () => {
        console.log('모달 닫힘'); // 나중에 여기서 상태관리로 modal 닫기
    };

    return (
        <S.ModalWrapper>
            <S.ModalHeader>
                <S.ModalTitle>{title}</S.ModalTitle>
                <S.CloseButton onClick={handleClose}>
                    <img src={CloseIcon} alt="닫기" />
                </S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>{renderContent()}</S.ModalBody>
        </S.ModalWrapper>
    );
}
