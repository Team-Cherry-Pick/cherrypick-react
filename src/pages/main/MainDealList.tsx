// MainDealList.tsx
import { useEffect, useRef, useCallback, useState } from 'react';
import { CardDeal } from '@/components/common/Card';
import styled from 'styled-components';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';
import { postSearchDeal } from '@/services/apiDeal';
import { PostSearchDealReq } from '@/types/deal/PostSearchDealReq';
import { Deal } from '@/types/deal/Deal';

const MainDealList = () => {

    const [items, setItems] = useState<Deal[]>([]);
    const isLoadingRef = useRef(false); // 상태 대신 ref 사용
    const pageRef = useRef(0);
    const hasNextRef = useRef(true);
    const observerRef = useRef<HTMLDivElement | null>(null);

    // fetch 함수
    const loadMore = useCallback(async () => {
        if (isLoadingRef.current || !hasNextRef.current) return;

        isLoadingRef.current = true;

        try {
            const req = new PostSearchDealReq(pageRef.current, 40);
            const res = await postSearchDeal(req);
            setItems((prev) => [...prev, ...res.deals]);
            pageRef.current += 1;
            hasNextRef.current = res.hasNext;
        } catch (error) {
            console.error(error);
        } finally {
            isLoadingRef.current = false;
        }
    }, []);

    // 최초 1회 로딩
    useEffect(() => {
        loadMore();
    }, [loadMore]);

    // 스크롤 도달 감지
    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;
            if (entry.isIntersecting && !isLoadingRef.current) {
                loadMore();
            }
        },
        [loadMore]
    );

    // IntersectionObserver 등록
    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 1.0,
        });

        const target = observerRef.current;
        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [handleObserver]);

    return (
        <DealGrid>
            {items.map((deal, i) => (
                <CardDeal key={`${deal.dealId}-${i}`} deal={deal} />
            ))}
            {isLoadingRef && (
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
