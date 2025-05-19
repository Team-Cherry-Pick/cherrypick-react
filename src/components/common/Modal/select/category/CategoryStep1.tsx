// components/upload/category/CategoryStep1.tsx
import { mockCategories } from '@/mocks/mockCategories';
import * as S from '../select.style';
import LeftArrowIcon from '@/assets/icons/left-arrow-Icon.svg';
import RightArrowIcon from '@/assets/icons/right-arrow-Icon.svg';

interface CategoryStep1Props {
    onNext: (category: string) => void;
    onFinalSelect: (category: string[]) => void;
}

export function CategoryStep1({ onNext, onFinalSelect }: CategoryStep1Props) {
    const topCategories = Object.keys(mockCategories); // 대분류 가져오기

    return (
        <>
            <S.textSubheaderCategory>
                <img src={LeftArrowIcon} alt="이전" style={{ marginRight: '8px' }} />
                전체 카테고리
            </S.textSubheaderCategory>

            <S.listCategorySelect>
                {topCategories.map(category => (
                    <S.itemCategorySelect
                        key={category}
                        onClick={() =>
                            category === '기타'
                                ? onFinalSelect([category])
                                : onNext(category)
                        }
                    >
                        {category}
                        {category !== '기타' && <img src={RightArrowIcon} alt="다음" />}
                    </S.itemCategorySelect>
                ))}
            </S.listCategorySelect>
        </>
    );
}
