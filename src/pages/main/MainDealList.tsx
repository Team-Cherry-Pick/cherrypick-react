// MainDealList.tsx
import { useEffect, useRef, useCallback, useState } from 'react';
import { CardDeal } from '@/components/common/Card';
import { fetchDeals } from '@/services/apiDeal';
import styled from 'styled-components';
import type { DetailedDeal, FetchDealsResponse } from '@/types/Deal';
import { toDetailedDeal } from '@/utils/dealMapper';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';

const MainDealList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<DetailedDeal[]>([]);
    const [, setPage] = useState(0);
    const pageRef = useRef(0);
    const [hasNext, setHasNext] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const loadMore = useCallback(async () => {
        if (isLoading || !hasNext) return;

        setIsLoading(true);
        try {
            const { deals, hasNext: next }: FetchDealsResponse = await fetchDeals(pageRef.current);
            const converted: DetailedDeal[] = deals.map(toDetailedDeal);

            setItems((prev) => [...prev, ...converted]);
            pageRef.current += 1;
            setPage(pageRef.current);
            setHasNext(next);
        } catch (err) {
            console.error('핫딜 목록 조회 실패:', err);
        } finally {
            setIsLoading(false);
        }
    }, [hasNext, isLoading]);

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting && !isLoading) {
            loadMore();
        }
    }, [loadMore, isLoading]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 1.0,
        });

        const currentTarget = observerRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [handleObserver]);

    return (
        <DealGrid>
            {items.map((deal, i) => (
                <CardDeal key={`${deal.dealId}-${i}`} deal={deal} />
            ))}
            {isLoading && (
                <SpinnerWrapper>
                    <LoadingSpinner />
                </SpinnerWrapper>
            )}
            <ObserverTarget ref={observerRef} />
        </DealGrid>
    );
};

export default MainDealList;

const DealGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ObserverTarget = styled.div`
  height: 1px;
`;

const SpinnerWrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]};
`;
