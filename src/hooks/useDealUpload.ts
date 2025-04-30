// hooks/useDealUpload.ts
import { useSetAtom } from 'jotai';
import { newDealAtom, selectedCategoryPathAtom } from '@/store/deals';

/**
 * 업로드용 딜 상태 조작 훅
 */
export function useDealUpload() {
    const setDeal = useSetAtom(newDealAtom);
    const setCategoryPath = useSetAtom(selectedCategoryPathAtom);

    /**
     * 카테고리 선택 시 상태 업데이트
     * @param steps 예: ['생활용품', '세탁세제', '액체세제']
     * @param categoryId 실제 서버로 보낼 ID
     */
    const setCategory = (steps: string[], categoryId: number) => {
        const pathString = steps.join(' > ');
        setCategoryPath(pathString);
        setDeal(prev => ({
            ...prev,
            categoryId,
        }));
    };

    return {
        setCategory,
    };
}
