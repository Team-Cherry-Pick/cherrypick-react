// MainDealList.tsx
import { useEffect, useRef, useCallback, useState } from 'react';
import { CardDeal } from '@/components/common/Card';
import { mockDeals } from '@/mocks/mockDeals';
import styled from 'styled-components';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';

const MainDealList = () => {
    const [items, setItems] = useState(mockDeals);
    const [isLoading, setIsLoading] = useState(false);
    //const [items, setItems] = useState(Array.from({ length: 20 }));
    //const [page, setPage] = useState(1);
    const observerRef = useRef<HTMLDivElement | null>(null);


    const loadMore = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            setItems((prev) => [...prev, ...mockDeals]);
            setIsLoading(false);
        }, 1000); // 1초 후에 mock 추가 (로딩 느낌 주기)
    }, []);

    // const loadMore = useCallback(() => {
    //     const newItems = Array.from({ length: 20 }, (_, i) => i + page * 20);
    //     setItems((prev) => [...prev, ...newItems]);
    //     setPage((prev) => prev + 1);
    // }, [page]);

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
            {/* {items.map((_, i) => (
                <CardDeal key={i} />
            ))} */}
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
