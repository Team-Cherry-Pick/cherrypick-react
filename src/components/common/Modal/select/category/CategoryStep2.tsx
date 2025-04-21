import * as S from '../select.style';
import LeftArrowIcon from '@/assets/icons/left-arrow-icon.svg';
import RightArrowIcon from '@/assets/icons/right-arrow-icon.svg';
// @todo 하위 카테고리 정리

interface CategoryStep2Props {
    onNext: (category: string) => void;
    onBack: () => void;
    selected: string[];
}

export function CategoryStep2({ onNext, onBack, selected }: CategoryStep2Props) {
    const selectedCategory = selected[0];

    return (
        <>
            <S.textSubheaderCategory onClick={onBack}>
                <img src={LeftArrowIcon} alt="이전" style={{ marginRight: '8px' }} />
                {selectedCategory}
            </S.textSubheaderCategory>

            <S.listCategorySelect>
                <S.itemCategorySelect onClick={() => onNext('서브카테고리')}>
                    서브카테고리
                    <img src={RightArrowIcon} alt="다음" />
                </S.itemCategorySelect>
            </S.listCategorySelect>
        </>
    );
}
