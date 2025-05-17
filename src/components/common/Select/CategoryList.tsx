import styled from 'styled-components';
import { useAtomValue } from 'jotai';
import { categoryTreeAtom } from '@/store/category';
import { Category } from '@/types/Category';

interface Props {
    selectedSteps: string[];
    onSelect: (nextSteps: string[]) => void;
}

export function CategoryList({ selectedSteps, onSelect }: Props) {
    const tree = useAtomValue(categoryTreeAtom);
    if (!tree) return null;

    let current: Category[] = tree.categories; // ✅ 핵심 변경

    for (const step of selectedSteps) {
        const found = current.find((c) => c.name === step);
        if (!found) {
            current = [];
            break;
        }
        current = found.subCategories ?? [];
    }

    // selectedSteps가 없으면 = 현재 최상위 단계
    // current는 tree랑 같아서 그대로 보여주면 됨

    return (
        <CategoryGrid>
            {current.map((item) => (
                <CategoryItem
                    key={item.categoryId}
                    onClick={() => onSelect([...selectedSteps, item.name])}
                >
                    {item.name}
                </CategoryItem>
            ))}
        </CategoryGrid>
    );
}

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const CategoryItem = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
  color: ${({ theme }) => theme.colors.content.main};
  text-align: left;
  word-break: break-word;
  white-space: normal;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[1.5]} 0;
`;
