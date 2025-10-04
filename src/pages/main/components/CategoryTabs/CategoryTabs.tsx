import styles from './CategoryTabs.module.css';
import { useCategoriesQuery } from '@/store/category';
import { useAtom } from 'jotai';
import { categoryIdAtom } from '@/store/search';
import { useRef, useEffect } from 'react';

export function CategoryTabs() {
    const { data: categories = [], isLoading } = useCategoriesQuery();
    const [selectedCategoryId, setSelectedCategoryId] = useAtom(categoryIdAtom);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // 선택된 카테고리가 변경될 때 해당 탭을 화면에 보이도록 스크롤
    useEffect(() => {
        if (selectedCategoryId && scrollContainerRef.current) {
            const selectedButton = scrollContainerRef.current.querySelector(
                `[data-category-id="${selectedCategoryId}"]`
            ) as HTMLElement;
            
            if (selectedButton) {
                selectedButton.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }, [selectedCategoryId]);

    const handleCategorySelect = (categoryId: number) => {
        if (selectedCategoryId === categoryId) {
            // 같은 카테고리를 다시 클릭하면 전체로 변경
            setSelectedCategoryId(undefined);
        } else {
            setSelectedCategoryId(categoryId);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.scrollContainer}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className={styles.skeletonTab} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.scrollContainer} ref={scrollContainerRef}>
                <button
                    className={`${styles.categoryTab} ${selectedCategoryId === undefined ? styles.active : ''}`}
                    onClick={() => setSelectedCategoryId(undefined)}
                >
                    전체
                </button>
                {categories.map((category) => (
                    <button
                        key={category.categoryId}
                        className={`${styles.categoryTab} ${selectedCategoryId === category.categoryId ? styles.active : ''}`}
                        onClick={() => handleCategorySelect(category.categoryId)}
                        data-category-id={category.categoryId}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
}