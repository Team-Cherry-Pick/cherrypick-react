import * as S from './card.style';
import { Clock, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { DetailedDeal } from '@/types/Deal';
import { HeatBadge } from '../Badge';

interface Props {
    deal: DetailedDeal;
}

export const CardDeal = ({ deal }: Props) => {
    const navigate = useNavigate();

    if (!deal) {
        return null;
    }

    const mainImage = deal.imageUrls?.[0]?.url ?? null;

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
                    <S.Store>{deal.store?.storeName ?? '알 수 없음'}</S.Store>
                    <span>|</span>
                    <S.Tags>{deal.infoTags.map(name => `${name}`).join(' ')}</S.Tags>
                </S.TagRow>

                <S.PriceRow>
                    <S.Percent>{discountPercent}%</S.Percent>
                    <S.Price>{deal.price.discountedPrice.toLocaleString()}원</S.Price>
                </S.PriceRow>

                <S.Meta>
                    <span>by {deal.user?.userName ?? '알 수 없음'}</span>
                    <span className="divider">|</span>
                    <span>
                        <Clock /> 1시간 전
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
