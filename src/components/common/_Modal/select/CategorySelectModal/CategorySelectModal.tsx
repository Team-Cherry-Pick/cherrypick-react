import { useCategories } from '@/hooks/useCategories';
import { useDealUpload } from '@/hooks/useDealUpload';
import { categoryTreeAtom } from '@/store/category';
import { getCategoryIdFromSteps } from '@/utils/category';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import CategoryStep from './CategoryStep';
import SelectWrapper from '../SelectWrapper';

interface CategorySelectModalProps {
    onClose: () => void;
}

export default function CategourySelectModal({ onClose }: CategorySelectModalProps) {
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
        <SelectWrapper>
            <CategoryStep
                selectedSteps={selectedSteps}
                onNext={handleNextStep}
                onBack={handleBackStep}
                onSelectFinal={handleFinalSelect}
            />
        </SelectWrapper>
    );
}
