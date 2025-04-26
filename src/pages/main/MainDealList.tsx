// MainDealList.tsx
import { useEffect, useRef, useCallback, useState } from 'react';
import { CardDeal } from '@/components/common/Card';
import styled from 'styled-components';

const MainDealList = () => {
    const [items, setItems] = useState(Array.from({ length: 20 }));
    const [page, setPage] = useState(1);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const loadMore = useCallback(() => {
        const newItems = Array.from({ length: 20 }, (_, i) => i + page * 20);
        setItems((prev) => [...prev, ...newItems]);
        setPage((prev) => prev + 1);
    }, [page]);

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting) {
            loadMore();
        }
    }, [loadMore]);

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
            {items.map((_, i) => (
                <CardDeal key={i} />
            ))}
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
