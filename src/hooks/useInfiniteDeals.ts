// hooks/useInfiniteDeals.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchDeals } from '@/services/apiDeal';

export const useInfiniteDeals = () => {
    return useInfiniteQuery({
        queryKey: ['deals'],
        queryFn: ({ pageParam = 1 }) => fetchDeals(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.hasMore ? pages.length + 1 : undefined;
        },
    });
};
