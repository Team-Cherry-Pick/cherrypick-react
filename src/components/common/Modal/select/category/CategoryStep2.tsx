import * as S from '../select.style';
import { mockCategories } from '@/mocks/mockCategories';
import LeftArrowIcon from '@/assets/icons/left-arrow-icon.svg';
import RightArrowIcon from '@/assets/icons/right-arrow-icon.svg';

interface CategoryStep2Props {
    onNext: (category: string) => void;
    onBack: () => void;
    selected: string[];
}

export function CategoryStep2({ onNext, onBack, selected }: CategoryStep2Props) {
    const selectedCategory = selected[0] as keyof typeof mockCategories;
    const subcategories = mockCategories[selectedCategory]
        ? Object.keys(mockCategories[selectedCategory])
        : [];

    return (
        <>
            <S.textSubheaderCategory onClick={onBack}>
                <img src={LeftArrowIcon} alt="이전" style={{ marginRight: '8px' }} />
                {selectedCategory}
            </S.textSubheaderCategory>

            <S.listCategorySelect>
                {subcategories.map((subcategory) => (
                    <S.itemCategorySelect key={subcategory} onClick={() => onNext(subcategory)}>
                        {subcategory}
                        <img src={RightArrowIcon} alt="다음" />
                    </S.itemCategorySelect>
                ))}
            </S.listCategorySelect>
        </>
    );
}
