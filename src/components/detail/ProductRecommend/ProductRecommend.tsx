import { useEffect, useState } from 'react';
import { Clock, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getTimeAgo } from '@/utils/date';
import { fetchDeals } from '@/services/apiDeal';
import type { FetchedDeal } from '@/types/Deal';
import HeatBadge from '@/components/common/Badge/HeatBadge';
import * as S from './ProductRecommend.style';

export const ProductRecommend = () => {
    const [deals, setDeals] = useState<FetchedDeal[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadDeals = async () => {
            try {
                const response = await fetchDeals(0);
                const filteredDeals = response.deals.filter(deal => deal.imageUrl?.url);
                setDeals(filteredDeals.slice(0, 5));
            } catch (e) {
                console.error('딜 목록 로딩 실패', e);
            }
        };
        loadDeals();
    }, []);

    return (
        <S.Wrapper>
            <S.Title>지금 뜨고 있는 비슷한 핫딜</S.Title>
            <S.Divider />
            <S.RecommendList>
                {deals.map((item, index) => (
                    <div key={item.dealId}>
                        <S.RecommendItem onClick={() => navigate(`/product/${item.dealId}`)}>
                            <S.Thumbnail>
                                <S.StyledImageWrapper>
                                    <S.StyledImage src={item.imageUrl.url} alt={item.title} />
                                </S.StyledImageWrapper>
                                <S.HeatBadgeWrapper>
                                    <HeatBadge heat={item.heat} size="large" />
                                </S.HeatBadgeWrapper>
                            </S.Thumbnail>
                            <S.Info>
                                <S.TopRow>
                                    <S.DealTitle title={item.title}>{item.title}</S.DealTitle>
                                </S.TopRow>
                                <S.TagRow>
                                    <S.StoreName>{item.store}</S.StoreName>
                                    <span>|</span>
                                    <S.Tags>{item.infoTags.join(' ')}</S.Tags>
                                </S.TagRow>
                                <S.PriceRow>
                                    <S.Percent>
                                        {Math.round(
                                            ((item.price.regularPrice - item.price.discountedPrice) /
                                                item.price.regularPrice) * 100
                                        )}%
                                    </S.Percent>
                                    <S.Price>{item.price.discountedPrice.toLocaleString()}원</S.Price>
                                </S.PriceRow>
                                <S.Meta>
                                    <span><Clock /> {getTimeAgo(item.createdAt)}</span>
                                    <span className="divider">|</span>
                                    <span><MessageSquare /> {item.totalComments}</span>
                                </S.Meta>
                            </S.Info>
                        </S.RecommendItem>
                        {index !== deals.length - 1 && <S.ItemDivider />}
                    </div>
                ))}
            </S.RecommendList>
        </S.Wrapper>
    );
};

export default ProductRecommend;
