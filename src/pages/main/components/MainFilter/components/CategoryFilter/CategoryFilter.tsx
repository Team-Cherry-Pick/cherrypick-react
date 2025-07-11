import { useAtomValue, useSetAtom } from 'jotai';
import styles from './CategoryFilter.module.css';
import {
    useCategoriesQuery,
    useRefreshCategories,
    currentCategoriesAtom,
    finalSelectedCategoryAtom,
    selectedCategoryPathAtom,
    useCategoryNavigation,
} from '@/store/category';
import { Suspense, useEffect } from 'react';
import { categoryIdAtom, triggerFetchAtom } from '@/store/search';
import { Category } from '@/types/Category';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';

function findCategoryIdByPath(categories: Category[], path: string[]): number | undefined {
    let current: Category[] = categories;
    let foundId: number | undefined = undefined;
    for (const name of path) {
        const found = current.find((cat: Category) => cat.name === name);
        if (!found) break;
        foundId = found.categoryId;
        current = found.subCategories || [];
    }
    return foundId;
}

function CategoryFilterList() {
    const categories = useAtomValue(currentCategoriesAtom);
    const finalSelectedCategory = useAtomValue(finalSelectedCategoryAtom);
    const { selectCategory, selectFinalCategory } = useCategoryNavigation();
    const setCategoryId = useSetAtom(categoryIdAtom);
    const triggerFetch = useSetAtom(triggerFetchAtom);

    return (
        <ul className={styles.categoryList}>
            {categories.map(category => {
                const isLeaf = !category.subCategories || category.subCategories.length === 0;
                const isSelected = finalSelectedCategory?.categoryId === category.categoryId && isLeaf;
                return (
                    <li
                        key={category.categoryId}
                        className={`${styles.categoryItem} ${isSelected ? styles.primary : ''}`}
                        style={isSelected ? { fontWeight: 'bold', color: 'var(--color-primary)' } : {}}
                        onClick={() => {
                            if (isLeaf) {
                                selectFinalCategory(category.categoryId, category.name);
                                setCategoryId(category.categoryId);
                                triggerFetch();
                            } else {
                                selectCategory(category.name);
                            }
                        }}
                    >
                        {category.name}
                    </li>
                );
            })}
        </ul>
    );
}

export function CategoryFilter() {
    // React Query로 캐시된 부모 카테고리 데이터 사용
    const { data: categories = [], isLoading, error } = useCategoriesQuery();
    const { refreshCategories, isManualRefreshEnabled } = useRefreshCategories();
    const selectedCategoryPath = useAtomValue(selectedCategoryPathAtom);
    const setCategoryId = useSetAtom(categoryIdAtom);
    const setFinalSelectedCategory = useSetAtom(finalSelectedCategoryAtom);
    const triggerFetch = useSetAtom(triggerFetchAtom);
    const { goToParent } = useCategoryNavigation();

    useEffect(() => {
        const id =
            selectedCategoryPath.length === 0 ? undefined : findCategoryIdByPath(categories, selectedCategoryPath);
        setCategoryId(id);
        triggerFetch();
    }, [selectedCategoryPath, categories, setCategoryId, triggerFetch]);

    // 로딩 상태 처리
    if (isLoading) {
        return (
            <div>
                <div className={styles.flexBox}>
                    <div className={styles.title}>카테고리</div>
                </div>
                <LoadingSpinner />
            </div>
        );
    }

    // 에러 상태 처리
    if (error) {
        return (
            <div>
                <div className={styles.flexBox}>
                    <div className={styles.title}>카테고리</div>
                    {isManualRefreshEnabled && (
                        <button
                            onClick={refreshCategories}
                            style={{
                                fontSize: '12px',
                                padding: '4px 8px',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            새로고침
                        </button>
                    )}
                </div>
                <div style={{ color: 'var(--color-error)', padding: '1rem' }}>
                    카테고리를 불러오는데 실패했습니다.
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className={styles.flexBox}>
                <div className={styles.title}>카테고리</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        className={styles.goToParentButton}
                        onClick={() => {
                            setFinalSelectedCategory(null);
                            goToParent();
                        }}
                    >
                        상위 카테고리로 이동
                    </button>
                    {isManualRefreshEnabled && (
                        <button
                            onClick={refreshCategories}
                            style={{
                                fontSize: '12px',
                                padding: '4px 8px',
                                backgroundColor: 'var(--color-neutral-100)',
                                color: 'var(--color-content-main)',
                                border: '1px solid var(--color-neutral-200)',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                            title="카테고리 데이터 새로고침"
                        >
                            🔄
                        </button>
                    )}
                </div>
            </div>
            <div className={styles.categoryPath}>
                <div className={`${selectedCategoryPath.length === 0 && styles.currentPath}`}>전체</div>
                {selectedCategoryPath.map((category, index) => (
                    <>
                        <div>{'>'}</div>
                        <div className={`${index === selectedCategoryPath.length - 1 && styles.currentPath}`}>
                            {category}
                        </div>
                    </>
                ))}
            </div>
            <Suspense>
                <CategoryFilterList />
            </Suspense>
        </div>
    );
}
