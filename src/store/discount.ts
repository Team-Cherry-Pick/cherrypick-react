import { fetchDiscounts } from '@/services/apiDeal';
import { atom } from 'jotai';
import { useQuery } from '@tanstack/react-query';

export interface Discount {
    discountId: number;
    name: string;
}

// Time-based Cache + LRU 혼용 캐시 시스템
export const useDiscountsQuery = () => {
    return useQuery({
        queryKey: ['discounts'],
        queryFn: fetchDiscounts,
        staleTime: 7 * 24 * 60 * 60 * 1000, // 1주일 (밀리초)
        gcTime: 7 * 24 * 60 * 60 * 1000, // 1주일 후 가비지 컬렉션
        retry: 3, // 에러 시 3번 재시도
        retryDelay: 1000, // 재시도 간격 1초
    });
};

// 기존 Jotai atom은 하위 호환성을 위해 유지
export const discountsAtom = atom(async () => {
    const response = await fetchDiscounts();
    return response;
});
