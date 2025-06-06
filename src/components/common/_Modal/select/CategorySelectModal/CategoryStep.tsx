import styles from './CategoryStep.module.css';
import { categoryTreeAtom } from '@/store/category';
import { Category } from '@/types/Category';
import { useAtomValue } from 'jotai';
import LeftArrowIcon from '@/assets/icons/left-arrow-icon.svg';
import RightArrowIcon from '@/assets/icons/right-arrow-icon.svg';

interface CategoryStepProps {
    selectedSteps: string[];
    onNext: (category: string) => void;
    onBack: () => void;
    onSelectFinal: (steps: string[]) => void;
}

export default function CategoryStep({ selectedSteps, onNext, onBack, onSelectFinal }: CategoryStepProps) {
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
            <div className={styles.textSubheaderCategory} onClick={onBack}>
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
        </>
    );
}
