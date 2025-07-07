import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDeals } from '@/services/apiDeal';
import type { FetchedDeal } from '@/types/Deal';
import * as S from './ProductRecommend.style';
import { HeatBadge } from '@/components/common/Badge';
import { getRelativeTime } from '@/utils/time';
import ClockIcon from '@/assets/icons/clock.svg?url';
import TalkBubbleIcon from '@/assets/icons/talkbubble.svg?url';

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
                {deals.map((deal, index) => (
                    <div key={deal.dealId}>
                        <S.RecommendItem onClick={() => navigate(`/product/${deal.dealId}`)}>
                            <S.Thumbnail>
                                <S.StyledImageWrapper>
                                    <S.StyledImage src={deal.imageUrl.url} />
                                </S.StyledImageWrapper>
                                <S.HeatBadgeWrapper>
                                    <HeatBadge heat={deal.heat} size="small" />
                                </S.HeatBadgeWrapper>
                            </S.Thumbnail>
                            <S.Info>
                                <S.TopRow>
                                    <S.DealTitle title={deal.title}>{deal.title}</S.DealTitle>
                                </S.TopRow>
                                <S.TagRow>
                                    <S.StoreName>{deal.store}</S.StoreName>
                                    <span>|</span>
                                    <S.Tags>{deal.infoTags.join(' ')}</S.Tags>
                                </S.TagRow>
                                <S.PriceRow>
                                    {deal.price.priceType === 'VARIOUS' ? (
                                        <S.VariousPriceText>다양한 가격</S.VariousPriceText>
                                    ) : (
                                        <>
                                            {(() => {
                                                const percent = Math.round(
                                                    ((deal.price.regularPrice - deal.price.discountedPrice) /
                                                        deal.price.regularPrice) *
                                                    100
                                                );
                                                return isNaN(percent) ? null : <S.Percent>{percent}%</S.Percent>;
                                            })()}
                                            <S.Price>{deal.price.discountedPrice.toLocaleString()}원</S.Price>
                                        </>
                                    )}
                                </S.PriceRow>
                                <S.Meta>
                                    <span>
                                        <span style={{
                                            fontSize: '12px',
                                            color: 'var(--color-content-sub)'
                                        }}>
                                            by {deal.nickname || '익명'}
                                        </span>
                                        <span className="divider" style={{ color: 'var(--color-content-tertiary)' }}>|</span>
                                        <img
                                            src={ClockIcon}
                                            alt="clock"
                                            style={{
                                                width: 10,
                                                height: 10,
                                                verticalAlign: 'middle',
                                                filter: 'brightness(0) saturate(100%) invert(92%) sepia(0%) saturate(107%) hue-rotate(187deg) brightness(90%) contrast(92%)'
                                            }}
                                        />
                                        <span style={{
                                            fontSize: '12px',
                                            color: 'var(--color-content-sub)',
                                            marginLeft: '4px'
                                        }}>
                                            {getRelativeTime(deal.createdAt)}
                                        </span>
                                    </span>
                                    <span className="divider" style={{ color: 'var(--color-content-tertiary)' }}>|</span>
                                    <span>
                                        <img
                                            src={TalkBubbleIcon}
                                            alt="message"
                                            style={{
                                                width: 10,
                                                height: 10,
                                                verticalAlign: 'middle',
                                                filter: 'brightness(0) saturate(100%) invert(92%) sepia(0%) saturate(107%) hue-rotate(187deg) brightness(90%) contrast(92%)'
                                            }}
                                        />
                                        <span style={{
                                            fontSize: '12px',
                                            color: 'var(--color-content-sub)',
                                            marginLeft: '4px'
                                        }}>
                                            {deal.totalComments}
                                        </span>
                                    </span>
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
