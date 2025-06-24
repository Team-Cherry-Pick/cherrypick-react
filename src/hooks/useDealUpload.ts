// hooks/useDealUpload.ts
import { useSetAtom } from 'jotai';
import { UploadDeal } from '@/types/Deal';
import { newDealAtom } from '@/store/deals';

/**
 * 업로드용 딜 상태 조작 훅
 */
export function useDealUpload() {
    const setDeal = useSetAtom(newDealAtom);

    const setStore = (storeId: number, storeName: string) => {
        setDeal((prev: UploadDeal) => ({
            ...prev,
            storeId,
            storeName,
        }));
    };

    const setCategory = (categoryId: number) => {
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
