import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { useDealUpload } from '@/hooks/useDealUpload';
import { useCategories } from '@/hooks/useCategories';
import { getCategoryIdFromSteps } from '@/utils/category';
import { categoryTreeAtom } from '@/store/category';
import * as S from './select.style';
import { CategoryStep } from './CategoryStep';

interface Props {
    onClose: () => void;
}

export function CategorySelectModal({ onClose }: Props) {
    useCategories();
    const { setCategory } = useDealUpload();
    const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
    const tree = useAtomValue(categoryTreeAtom);

    const handleNextStep = (selected: string) => {
        setSelectedSteps(prev => [...prev, selected]);
    };

    const handleBackStep = () => {
        setSelectedSteps(prev => prev.slice(0, -1));
    };

    const handleFinalSelect = (steps: string[]) => {
        if (!tree) return;
        const id = getCategoryIdFromSteps(steps, tree);
        if (id) setCategory(steps, id);
        onClose();
    };

    return (
        <S.selectWrapper>
            <CategoryStep
                selectedSteps={selectedSteps}
                onNext={handleNextStep}
                onBack={handleBackStep}
                onSelectFinal={handleFinalSelect}
            />
        </S.selectWrapper>
    );
}
