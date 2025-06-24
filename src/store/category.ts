// atoms/categoryAtoms.ts
import { fetchCategories } from '@/services/apiCategory';
import { atom, useAtom } from 'jotai';

export interface Category {
    categoryId: number;
    name: string;
    subCategories: Category[];
}

export const categoriesAtom = atom(async () => {
    const response = await fetchCategories();
    console.log('Categories loaded:', response);
    return response;
});

// 현재 선택된 카테고리 경로 atom (모달 내 네비게이션용)
export const selectedCategoryPathAtom = atom<string[]>([]);

// 최종 선택된 카테고리 정보 atom (모달이 닫혀도 유지)
export const finalSelectedCategoryAtom = atom<{
    categoryId: number;
    path: string[];
} | null>(null);

export const currentCategoriesAtom = atom(async get => {
    const categories = await get(categoriesAtom);
    const selectedPath = get(selectedCategoryPathAtom);

    let current: Category[] = categories;
    for (const step of selectedPath) {
        const found = current.find(c => c.name === step);
        if (!found) {
            // 경로가 잘못된 경우 루트로 돌아감
            return categories;
        }
        current = found.subCategories;
    }

    return current;
});

type CategoryNavigationAction =
    | { type: 'SELECT_CATEGORY'; payload: string }
    | { type: 'GO_TO_PARENT' }
    | { type: 'GO_TO_ROOT' }
    | { type: 'GO_TO_BREADCRUMB'; payload: number }
    | { type: 'SELECT_FINAL_CATEGORY'; payload: { categoryId: number; categoryName: string } }
    | { type: 'RESET' };

export const categoryNavigationAtom = atom(null, (get, set, action: CategoryNavigationAction) => {
    const currentPath = get(selectedCategoryPathAtom);

    switch (action.type) {
        case 'SELECT_CATEGORY': {
            const categoryName = action.payload as string;
            set(selectedCategoryPathAtom, [...currentPath, categoryName]);
            break;
        }

        case 'GO_TO_PARENT':
            if (currentPath.length > 0) {
                set(selectedCategoryPathAtom, currentPath.slice(0, -1));
            }
            break;

        case 'GO_TO_ROOT':
            set(selectedCategoryPathAtom, []);
            break;

        case 'GO_TO_BREADCRUMB': {
            const targetIndex = action.payload as number;
            set(selectedCategoryPathAtom, currentPath.slice(0, targetIndex + 1));
            break;
        }

        case 'SELECT_FINAL_CATEGORY': {
            // 모달이 닫혀도 유지되는 정보
            const { categoryId, categoryName: finalCategoryName } = action.payload;
            const finalPath = [...currentPath, finalCategoryName];
            set(finalSelectedCategoryAtom, { categoryId, path: finalPath });
            break;
        }

        case 'RESET':
            // 네비게이션 경로만 초기화
            set(selectedCategoryPathAtom, []);
            break;

        default:
            break;
    }
});

export const useCategoryNavigation = () => {
    const [, navigate] = useAtom(categoryNavigationAtom);

    return {
        selectCategory: (name: string) => navigate({ type: 'SELECT_CATEGORY', payload: name }),
        goToParent: () => navigate({ type: 'GO_TO_PARENT' }),
        goToRoot: () => navigate({ type: 'GO_TO_ROOT' }),
        goToBreadcrumb: (index: number) => navigate({ type: 'GO_TO_BREADCRUMB', payload: index }),
        selectFinalCategory: (categoryId: number, categoryName: string) =>
            navigate({ type: 'SELECT_FINAL_CATEGORY', payload: { categoryId, categoryName } }),
        reset: () => navigate({ type: 'RESET' }),
    };
};
