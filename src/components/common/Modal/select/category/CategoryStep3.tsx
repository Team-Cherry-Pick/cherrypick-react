import * as S from '../select.style';
import LeftArrowIcon from '@/assets/icons/left-arrow-icon.svg';
// @todo 하위 카테고리 정리

interface CategoryStep3Props {
    onSelect: (category: string[]) => void;
    onBack: () => void;
    selected: string[];
}

export function CategoryStep3({ onBack, onSelect, selected }: CategoryStep3Props) {
    const finalOptions = ['선택1', '선택2', '선택3'];

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
