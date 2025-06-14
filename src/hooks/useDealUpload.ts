// hooks/useDealUpload.ts
import { useSetAtom } from 'jotai';
import { UploadDeal } from '@/types/Deal';
import { newDealAtom, selectedCategoryPathAtom } from '@/store/deals';

/**
 * 업로드용 딜 상태 조작 훅
 */
export function useDealUpload() {
    const setDeal = useSetAtom(newDealAtom);
    const setCategoryPath = useSetAtom(selectedCategoryPathAtom);

    const setStore = (storeId: number, storeName: string) => {
        setDeal((prev: UploadDeal) => ({
            ...prev,
            storeId,
            storeName,
        }));
    };

    const setCategory = (steps: string[], categoryId: number) => {
        const pathString = steps.join(' > ');
        setCategoryPath(pathString);
        setDeal((prev: UploadDeal) => ({
            ...prev,
            categoryId,
        }));
    };

    const setDiscounts = (ids: number[], names: string[]) => {
        setDeal((prev: UploadDeal) => ({
            ...prev,
            discountIds: ids.length > 0 ? ids : [],
            discountNames: names.length > 0 ? names : [],
        }));
    };

    return {
        setCategory,
        setStore,
        setDiscounts,
    };
}
