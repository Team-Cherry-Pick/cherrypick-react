import { useEffect, useState } from 'react';
import { fetchDeals } from '@/services/apiDeal';
import type { FetchedDeal } from '@/types/Deal';
import * as S from './ProductRecommend.style';
import { CardDeal } from '@/components/common/Card';

export const ProductRecommend = () => {
    const [deals, setDeals] = useState<FetchedDeal[]>([]);

    useEffect(() => {
        const loadDeals = async () => {
            try {
                const response = await fetchDeals(0);
                const filteredDeals = response.deals.filter(deal => deal.imageUrl?.url);
                setDeals(filteredDeals.slice(0, 3));
            } catch {
                // 에러 무시
            }
        };
        loadDeals();
    }, []);

    return (
        <S.Wrapper>
            <S.Title>지금 뜨고 있는 다른 핫딜</S.Title>
            <S.Divider />
            <S.RecommendList>
                {deals.map((deal, index) => (
                    <div key={deal.dealId}>
                        <S.CardContainer>
                            <CardDeal deal={deal} forceMobile={true} />
                        </S.CardContainer>
                    </div>
                ))}
            </S.RecommendList>
        </S.Wrapper>
    );
};

export default ProductRecommend;
