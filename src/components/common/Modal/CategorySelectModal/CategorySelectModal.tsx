import styles from './CategorySelectModal.module.css';
import { useAtomValue } from 'jotai';
import { useCategoriesQuery, currentCategoriesAtom, useCategoryNavigation, selectedCategoryPathAtom } from '@/store/category';
import { Suspense } from 'react';
import { Category } from '@/types/Category';
import CloseIcon from '@/assets/icons/close-Icon.svg?react';
import LeftArrowIcon from '@/assets/icons/left-arrow-Icon.svg?react';
import RightArrowIcon from '@/assets/icons/right-arrow-Icon.svg?react';
import ModalLayout from '../components/ModalLayout';
import { useDealUpload } from '@/hooks/useDealUpload';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';

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

export function CategorySelectModal({ isOpen, close, unmount }: CategorySelectModalProps) {
    // React Query로 캐시된 부모 카테고리 데이터 사용
    const { isLoading, error } = useCategoriesQuery();
    const selectedCategoryPath = useAtomValue(selectedCategoryPathAtom);

    // 로딩 상태 처리
    if (isLoading) {
        return (
            <ModalLayout isOpen={isOpen} onExit={unmount}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2>카테고리 선택</h2>
                        <button className={styles.closeButton} onClick={close}>
                            <CloseIcon />
                        </button>
                    </div>
                    <LoadingSpinner />
                </div>
            </ModalLayout>
        );
    }

    // 에러 상태 처리
    if (error) {
        return (
            <ModalLayout isOpen={isOpen} onExit={unmount}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2>카테고리 선택</h2>
                        <button className={styles.closeButton} onClick={close}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div style={{ color: 'var(--color-error)', padding: '1rem', textAlign: 'center' }}>
                        카테고리를 불러오는데 실패했습니다.
                    </div>
                </div>
            </ModalLayout>
        );
    }

    return (
        <ModalLayout isOpen={isOpen} onExit={unmount}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>카테고리 선택</h2>
                    <button className={styles.closeButton} onClick={close}>
                        <CloseIcon />
                    </button>
                </div>
                <div className={styles.breadcrumb}>
                    <button className={styles.breadcrumbItem}>전체</button>
                    {selectedCategoryPath.map((category, index) => (
                        <div key={index} className={styles.breadcrumbItem}>
                            <LeftArrowIcon />
                            <span>{category}</span>
                        </div>
                    ))}
                </div>
                <ul className={styles.categoryList}>
                    <Suspense>
                        <CategoryList close={close} />
                    </Suspense>
                </ul>
            </div>
        </ModalLayout>
    );
}
