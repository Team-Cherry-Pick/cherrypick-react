import * as S from './card.style';
import { Clock, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { FetchedDeal } from '@/types/Deal';
import { HeatBadge } from '../Badge';
import { getRelativeTime } from '@/utils/time';
import { formatNumber } from '@/utils/number';

interface Props {
    deal: FetchedDeal;
}

export const CardDeal = ({ deal }: Props) => {
    const navigate = useNavigate();

    if (!deal) {
        return null;
    }

    const mainImage = deal.imageUrl?.url ?? null;

    const discountPercent =
        deal.price && deal.price.regularPrice > 0
            ? Math.round((1 - deal.price.discountedPrice / deal.price.regularPrice) * 100)
            : 0;

    return (
        <S.CardWrapper className={deal.soldout ? 'ended' : ''} onClick={() => navigate(`/product/${deal.dealId}`)}>
            {deal.soldout && <S.Overlay>종료된 핫딜입니다</S.Overlay>}
            <S.ImageBox>
                {mainImage && <S.StyledImage src={mainImage} alt="" />}
                <S.HeatBadgeWrapper>
                    <HeatBadge heat={deal.heat} size="large" />
                </S.HeatBadgeWrapper>
            </S.ImageBox>
            <S.InfoBox>
                <S.Title>{deal.title}</S.Title>

                <S.TagRow>
                    <S.Store>{deal.store}</S.Store>
                    <span>|</span>
                    <S.Tags>{deal.infoTags.map(name => `${name}`).join(' ')}</S.Tags>
                </S.TagRow>

                <S.PriceRow>
                    <S.Percent>{discountPercent}%</S.Percent>
                    <S.Price>{formatNumber(deal.price.discountedPrice)}원</S.Price>
                </S.PriceRow>

                <S.Meta>
                    <span
                        style={{
                            width: '7rem',
                            textAlign: 'end',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            display: 'inline-block',
                            verticalAlign: 'bottom',
                        }}
                        title={deal.nickname}
                    >
                        by {deal.nickname}
                    </span>
                    <span className="divider">|</span>
                    <span>
                        <Clock /> {getRelativeTime(deal.createdAt)}
                    </span>
                    <span className="divider">|</span>
                    <span>
                        <MessageSquare /> {deal.totalComments}
                    </span>
                </S.Meta>
            </S.InfoBox>
        </S.CardWrapper>
    );
};
