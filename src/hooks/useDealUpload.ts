// hooks/useDealUpload.ts
import { useSetAtom } from 'jotai';
import { newDealAtom, selectedCategoryPathAtom } from '@/store/deals';

/**
 * 업로드용 딜 상태 조작 훅
 */
export function useDealUpload() {
    const setDeal = useSetAtom(newDealAtom);
    const setCategoryPath = useSetAtom(selectedCategoryPathAtom);


    const setStore = (storeId: number, storeName: string) => {
        setDeal((prev) => ({
            ...prev,
            storeId,
            storeName,
        }));
    };

    const setCategory = (steps: string[], categoryId: number) => {
        const pathString = steps.join(' > ');
        setCategoryPath(pathString);
        setDeal(prev => ({
            ...prev,
            categoryId,
        }));
    };

    return {
        setCategory, setStore
    };
}
