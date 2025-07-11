// atoms/categoryAtoms.ts
import { fetchCategories } from '@/services/apiCategory';
import { atom, useAtom } from 'jotai';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export interface Category {
    categoryId: number;
    name: string;
    subCategories: Category[];
}

// 관리자 전용 수동 새로고침 활성화 플래그
export const enableManualRefreshAtom = atom<boolean>(false);

// 관리자가 수동 새로고침을 활성화/비활성화하는 유틸리티
export const useManualRefreshControl = () => {
    const [enableManualRefresh, setEnableManualRefresh] = useAtom(enableManualRefreshAtom);

    const enableRefresh = () => setEnableManualRefresh(true);
    const disableRefresh = () => setEnableManualRefresh(false);
    const toggleRefresh = () => setEnableManualRefresh(!enableManualRefresh);

    return {
        isEnabled: enableManualRefresh,
        enableRefresh,
        disableRefresh,
        toggleRefresh,
    };
};

// React Query로 캐시할 부모 카테고리 데이터 (시간 제한 없음)
export const useCategoriesQuery = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: Infinity, // 시간 제한 없음 - 수동으로만 무효화
        gcTime: Infinity, // 가비지 컬렉션 시간도 무제한
        retry: 3, // 에러 시 3번 재시도
        retryDelay: 1000, // 재시도 간격 1초
    });
};

// 수동 새로고침을 위한 훅 (관리자 전용)
export const useRefreshCategories = () => {
    const queryClient = useQueryClient();
    const [enableManualRefresh] = useAtom(enableManualRefreshAtom);

    const refreshCategories = () => {
        if (enableManualRefresh) {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        }
    };

    return {
        refreshCategories,
        isManualRefreshEnabled: enableManualRefresh
    };
};

// 기존 Jotai atom은 자식 컴포넌트용으로 유지
export const categoriesAtom = atom(async () => {
    const response = await fetchCategories();
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
