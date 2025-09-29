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

    const setDiscounts = (selectedItems: { id: number; name: string }[]) => {
        // 선택한 할인방식 ID만 (직접입력 제외 - id가 0이 아닌 것만)
        const discountIds = selectedItems
            .filter(item => item.id !== 0)
            .map(item => item.id);
        
        // 직접입력으로 추가한 할인방식만 (id가 0인 것만)
        const discountNames = selectedItems
            .filter(item => item.id === 0)
            .map(item => item.name);

        setDeal((prev: UploadDeal) => ({
            ...prev,
            discountIds: discountIds.length > 0 ? discountIds : [],
            discountNames: discountNames.length > 0 ? discountNames : [],
        }));
    };

    return {
        setCategory,
        setStore,
        setDiscounts,
    };
}
