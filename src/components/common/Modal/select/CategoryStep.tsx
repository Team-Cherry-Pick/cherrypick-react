import { useAtomValue } from 'jotai';
import { categoryTreeAtom } from '@/store/category';
import * as S from './select.style';
import LeftArrowIcon from '@/assets/icons/left-arrow-icon.svg';
import RightArrowIcon from '@/assets/icons/right-arrow-icon.svg';
import { Category } from '@/types/Category';

interface Props {
    selectedSteps: string[];
    onNext: (category: string) => void;
    onBack: () => void;
    onSelectFinal: (steps: string[]) => void;
}

export function CategoryStep({ selectedSteps, onNext, onBack, onSelectFinal }: Props) {
    const tree = useAtomValue(categoryTreeAtom);
    if (!tree) return null;

    let current: Category[] = tree;
    for (const step of selectedSteps) {
        const found = current.find(c => c.name === step);
        if (!found) break;
        current = found.subCategories;
    }

    const handleClick = (name: string, isFinal: boolean) => {
        const next = [...selectedSteps, name];
        if (isFinal) {
            onSelectFinal(next);
        } else {
            onNext(name);
        }
    };

    return (
        <>
            <S.textSubheaderCategory onClick={onBack}>
                <img src={LeftArrowIcon} alt="이전" style={{ marginRight: '8px' }} />
                {selectedSteps.length === 0 ? '전체 카테고리' : selectedSteps.join(' > ')}
            </S.textSubheaderCategory>

            <S.listCategorySelect>
                {current.map(item => (
                    <S.itemCategorySelect
                        key={item.name}
                        onClick={() => handleClick(item.name, item.subCategories.length === 0)}
                    >
                        {item.name}
                        {item.subCategories.length > 0 && <img src={RightArrowIcon} alt="다음\" />}
                    </S.itemCategorySelect>
                ))}
            </S.listCategorySelect>
        </>
    );
}
