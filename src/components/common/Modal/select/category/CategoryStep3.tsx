import * as S from '../select.style';
import { mockCategories } from '@/mocks/mockCategories';
import { CategoryNode } from '@/utils/category';
import LeftArrowIcon from '@/assets/icons/left-arrow-Icon.svg';

interface CategoryStep3Props {
    onSelect: (category: string[]) => void;
    onBack: () => void;
    selected: string[];
}

export function CategoryStep3({ onBack, onSelect, selected }: CategoryStep3Props) {
    // mockCategories에서 selected[0], selected[1]을 통해 하위 옵션 가져오기
    let current: CategoryNode = mockCategories;

    for (const step of selected) {
        if (!current || typeof current !== 'object') break;
        current = current[step];
    }

    const finalOptions = current && typeof current === 'object'
        ? Object.keys(current)
        : [];

    const handleSelect = (item: string) => {
        const updated = [...selected, item];
        onSelect(updated);
        console.log('최종 선택:', updated);
    };

    return (
        <>
            <S.textSubheaderCategory onClick={onBack}>
                <img src={LeftArrowIcon} alt="이전" style={{ marginRight: '8px' }} />
                {selected.join(' > ')}
            </S.textSubheaderCategory>

            <S.listCategorySelect>
                {finalOptions.map(item => (
                    <S.itemCategorySelect key={item} onClick={() => handleSelect(item)}>
                        {item}
                    </S.itemCategorySelect>
                ))}
            </S.listCategorySelect>
        </>
    );
}
