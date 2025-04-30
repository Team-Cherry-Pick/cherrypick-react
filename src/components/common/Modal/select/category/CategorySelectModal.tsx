import { useState } from 'react';
import { useDealUpload } from '@/hooks/useDealUpload';
import { getCategoryIdFromSteps } from '@/utils/category';
import { mockCategories } from '@/mocks/mockCategories';
import * as S from '../select.style';
import { CategoryStep1 } from './CategoryStep1';
import { CategoryStep2 } from './CategoryStep2';
import { CategoryStep3 } from './CategoryStep3';

interface Props {
    onClose: () => void;
}

export function CategorySelectModal({ onClose }: Props) {
    const { setCategory } = useDealUpload();
    const [step, setStep] = useState(1);
    const [selectedSteps, setSelectedSteps] = useState<string[]>([]);

    const handleNextStep = (selected: string) => {
        setSelectedSteps(prev => [...prev, selected]);
        setStep(prev => prev + 1);
    };

    const handleBackStep = () => {
        setSelectedSteps(prev => prev.slice(0, -1));
        setStep(prev => prev - 1);
    };

    const handleFinalSelect = (selectedSteps: string[]) => {
        const categoryId = getCategoryIdFromSteps(selectedSteps, mockCategories);
        if (categoryId) {
            setCategory(selectedSteps, categoryId);
        }
        onClose();
    };

    return (
        <S.selectWrapper>
            {step === 1 && (
                <CategoryStep1
                    onNext={handleNextStep}
                    onFinalSelect={handleFinalSelect}
                />
            )}
            {step === 2 && (
                <CategoryStep2
                    onNext={handleNextStep}
                    onBack={handleBackStep}
                    selected={selectedSteps}
                />
            )}
            {step === 3 && (
                <CategoryStep3
                    onSelect={handleFinalSelect}
                    onBack={handleBackStep}
                    selected={selectedSteps}
                />
            )}
        </S.selectWrapper>
    );
}
