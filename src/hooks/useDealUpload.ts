// hooks/useDealUpload.ts
import { useSetAtom } from 'jotai';
import { Deal } from '@/types/Deal';
import { newDealAtom, selectedCategoryPathAtom } from '@/store/deals';

/**
 * 업로드용 딜 상태 조작 훅
 */
export function useDealUpload() {
    const setDeal = useSetAtom(newDealAtom);
    const setCategoryPath = useSetAtom(selectedCategoryPathAtom);


    const setStore = (storeId: number, storeName: string) => {
        setDeal((prev: Deal) => ({
            ...prev,
            storeId,
            storeName,
        }));
    };

    const setCategory = (steps: string[], categoryId: number) => {
        const pathString = steps.join(' > ');
        setCategoryPath(pathString);
        setDeal((prev: Deal) => ({
            ...prev,
            categoryId,
        }));
    };

    const setDiscounts = (ids: number[], names: string[]) => {
        setDeal((prev: Deal) => ({
            ...prev,
            discountIds: ids.length > 0 ? ids : [],
            discountNames: names.length > 0 ? names : [],
        }));
    };

    return {
        setCategory, setStore, setDiscounts
    };
}
