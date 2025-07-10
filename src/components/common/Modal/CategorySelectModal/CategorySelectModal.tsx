import styles from './CategorySelectModal.module.css';
import { useAtomValue } from 'jotai';
import { currentCategoriesAtom, useCategoryNavigation, selectedCategoryPathAtom } from '@/store/category';
import { Suspense } from 'react';
import { Category } from '@/types/Category';
import CloseIcon from '@/assets/icons/close-Icon.svg';
import LeftArrowIcon from '@/assets/icons/left-arrow-Icon.svg';
import RightArrowIcon from '@/assets/icons/right-arrow-Icon.svg';
import ModalLayout from '../components/ModalLayout';
import { useDealUpload } from '@/hooks/useDealUpload';

interface CategorySelectModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

function CategoryList({ close }: { close: () => void }) {
    const currentCategories = useAtomValue(currentCategoriesAtom);
    const { setCategory } = useDealUpload();
    const { selectCategory, selectFinalCategory } = useCategoryNavigation();

    const handleClick = (item: Category, isFinal: boolean) => {
        if (isFinal) {
            setCategory(item.categoryId);
            selectFinalCategory(item.categoryId, item.name);
            close();
        } else {
            selectCategory(item.name);
        }
    };

    return (
        <>
            {currentCategories.map(item => (
                <li
                    className={styles.itemCategorySelect}
                    key={item.categoryId}
                    onClick={() => handleClick(item, item.subCategories.length === 0)}
                >
                    {item.name}
                    {item.subCategories.length > 0 && <RightArrowIcon />}
                </li>
            ))}
        </>
    );
}

function CategoryHeader() {
    const { goToParent } = useCategoryNavigation();
    const selectedPath = useAtomValue(selectedCategoryPathAtom);

    const breadcrumbText = selectedPath.length === 0 ? '전체 카테고리' : selectedPath.join(' > ');

    return (
        <div className={styles.textSubheaderCategory} onClick={goToParent}>
            <img className={styles.leftArrowIcon} src={LeftArrowIcon} alt="이전" />
            {breadcrumbText}
        </div>
    );
}

export function CategorySelectModal({ isOpen, close, unmount }: CategorySelectModalProps) {
    const { reset } = useCategoryNavigation();

    const handleClose = () => {
        reset();
        close();
    };

    return (
        <ModalLayout isOpen={isOpen} onExit={unmount}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>카테고리 선택</h2>
                    <button className={styles.closeButton} onClick={handleClose}>
                        <img src={CloseIcon} alt="닫기" />
                    </button>
                </div>
                <div className={styles.categoryContainer}>
                    <Suspense fallback={<div>...</div>}>
                        <CategoryHeader />
                        <ul className={styles.listCategorySelect}>
                            <CategoryList close={handleClose} />
                        </ul>
                    </Suspense>
                </div>
            </div>
        </ModalLayout>
    );
}
