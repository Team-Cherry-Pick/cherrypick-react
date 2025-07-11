import { fetchStores } from '@/services/apiDeal';
import { atom } from 'jotai';
import { useQuery } from '@tanstack/react-query';

export interface Store {
    storeId: number;
    name: string;
    isAffiliate: boolean;
    backgroundColor: string;
    textColor: string;
    storeRank: number;
}

// Time-based Cache + LRU 혼용 캐시 시스템
export const useStoresQuery = () => {
    return useQuery({
        queryKey: ['stores'],
        queryFn: fetchStores,
        staleTime: 7 * 24 * 60 * 60 * 1000, // 1주일 (밀리초)
        gcTime: 7 * 24 * 60 * 60 * 1000, // 1주일 후 가비지 컬렉션
        retry: 3, // 에러 시 3번 재시도
        retryDelay: 1000, // 재시도 간격 1초
    });
};

// 기존 Jotai atom은 하위 호환성을 위해 유지
export const storesAtom = atom(async () => {
    const response = await fetchStores();
    return response;
});
