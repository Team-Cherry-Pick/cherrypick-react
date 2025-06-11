import styles from './CategorySelectModal.module.css';
import { useAtomValue } from 'jotai';
import { categoryTreeAtom } from '@/store/category';
import { useState } from 'react';
import { Category } from '@/types/Category';
import { getCategoryIdFromSteps } from '@/utils/category';
import { useDealUpload } from '@/hooks/useDealUpload';
import CloseIcon from '@/assets/icons/close-Icon.svg';
import LeftArrowIcon from '@/assets/icons/left-arrow-icon.svg';
import RightArrowIcon from '@/assets/icons/right-arrow-icon.svg';
import { useCategories } from '@/hooks/useCategories';
import ModalLayout from '../components/ModalLayout';

interface CategorySelectModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

export function CategorySelectModal({ isOpen, close, unmount }: CategorySelectModalProps) {
    useCategories();
    const { setCategory } = useDealUpload();
    const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
    const tree = useAtomValue(categoryTreeAtom);

    let current: Category[] = tree.categories;
    for (const step of selectedSteps) {
        const found = current.find(c => c.name === step);
        if (!found) break;
        current = found.subCategories;
    }

    const handleNextStep = (selected: string) => {
        setSelectedSteps(prev => [...prev, selected]);
    };

    const handleBackStep = () => {
        setSelectedSteps(prev => prev.slice(0, -1));
    };

    const handleFinalSelect = (steps: string[]) => {
        if (!tree.categories) return;
        const id = getCategoryIdFromSteps(steps, tree.categories);
        if (id) setCategory(steps, id);
        close();
    };

    const handleClick = (name: string, isFinal: boolean) => {
        const next = [...selectedSteps, name];
        if (isFinal) {
            handleFinalSelect(next);
        } else {
            handleNextStep(name);
        }
    };

    return (
        <ModalLayout isOpen={isOpen} onExit={unmount}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>카테고리 선택</h2>
                    <button className={styles.closeButton} onClick={close}>
                        <img src={CloseIcon} alt="닫기" />
                    </button>
                </div>
                <div className={styles.categoryContainer}>
                    <div className={styles.textSubheaderCategory} onClick={handleBackStep}>
                        <img className={styles.leftArrowIcon} src={LeftArrowIcon} alt="이전" />
                        {selectedSteps.length === 0 ? '전체 카테고리' : selectedSteps.join(' > ')}
                    </div>

                    <ul className={styles.listCategorySelect}>
                        {current.map(item => (
                            <li
                                className={styles.itemCategorySelect}
                                key={item.name}
                                onClick={() => handleClick(item.name, item.subCategories.length === 0)}
                            >
                                {item.name}
                                {item.subCategories.length > 0 && <img src={RightArrowIcon} alt="다음\" />}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </ModalLayout>
    );
}
