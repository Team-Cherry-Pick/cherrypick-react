// components/Select/CategoryList.tsx
import { useAtomValue } from 'jotai';
import { categoryTreeAtom } from '@/store/category';
import { Category } from '@/types/Category';
import * as S from '@/components/common/Modal/select/select.style';

interface Props {
    selectedSteps: string[];
    onSelect: (nextSteps: string[]) => void;
}

export function CategoryList({ selectedSteps, onSelect }: Props) {
    const tree = useAtomValue(categoryTreeAtom);
    if (!tree) return null;

    let current: Category[] = tree;
    for (const step of selectedSteps) {
        const found = current.find(c => c.name === step);
        if (!found) break;
        current = found.subCategories;
    }

    return (
        <S.CategoryGrid>
            {current.map(item => (
                <S.CategoryItem
                    key={item.name}
                    onClick={() => onSelect([...selectedSteps, item.name])}
                >
                    {item.name}
                </S.CategoryItem>
            ))}
        </S.CategoryGrid>
    );
}
