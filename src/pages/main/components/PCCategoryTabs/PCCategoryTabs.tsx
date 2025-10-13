import styles from './PCCategoryTabs.module.css';
import { useCategoriesQuery } from '@/store/category';
import { useAtom } from 'jotai';
import { categoryIdAtom } from '@/store/search';

export function PCCategoryTabs() {
    const { data: categories = [], isLoading } = useCategoriesQuery();
    const [selectedCategoryId, setSelectedCategoryId] = useAtom(categoryIdAtom);

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
                <div className={styles.tabContainer}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className={styles.skeletonTab} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
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
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}