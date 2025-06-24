import { useAtomValue, useSetAtom } from 'jotai';
import styles from './CategoryFilter.module.css';
import {
    categoriesAtom,
    currentCategoriesAtom,
    finalSelectedCategoryAtom,
    selectedCategoryPathAtom,
    useCategoryNavigation,
} from '@/store/category';
import { Suspense, useEffect } from 'react';
import { categoryIdAtom, triggerFetchAtom } from '@/store/search';
import { Category } from '@/types/Category';

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
    const categories = useAtomValue(categoriesAtom);
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

    return (
        <div>
            <div className={styles.flexBox}>
                <div className={styles.title}>카테고리</div>
                <button
                    className={styles.goToParentButton}
                    onClick={() => {
                        setFinalSelectedCategory(null);
                        goToParent();
                    }}
                >
                    상위 카테고리로 이동
                </button>
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
