import * as S from './card.style';
import { Clock, ThumbsUp, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Deal } from '@/types/Deal';

interface Props {
    deal: Deal;
}

export const CardDeal = ({ deal }: Props) => {
    const navigate = useNavigate();

    if (!deal) {
        return null;
    }

    const mainImage = deal.imageUrls && deal.imageUrls.length > 0 ? deal.imageUrls[0].url : null;

    const discountPercent =
        deal.price && deal.price.regularPrice > 0
            ? Math.round((1 - deal.price.discountedPrice / deal.price.regularPrice) * 100)
            : 0;

    return (
        <S.CardWrapper onClick={() => navigate(`/product/${deal.dealId}`)}>
            <S.ImageBox>
                {mainImage && <img src={mainImage} alt="" />}
            </S.ImageBox>

            <S.InfoBox>
                <S.Title>{deal.title}</S.Title>

                <S.TagRow>
                    <S.Store>{deal.storeName}</S.Store>
                    <span>|</span>
                    <S.Tags>{deal.discountNames.map(name => `#${name}`).join(' ')}</S.Tags>
                </S.TagRow>

                <S.PriceRow>
                    <S.Percent>{discountPercent}%</S.Percent>
                    <S.Price>{deal.price.discountedPrice.toLocaleString()}원</S.Price>
                </S.PriceRow>

                <S.Meta>
                    <span><Clock /> 1시간 전</span>
                    <span className="divider">|</span>
                    <span><ThumbsUp /> 0</span>
                    <span className="divider">|</span>
                    <span><MessageSquare /> 0</span>
                </S.Meta>
            </S.InfoBox>
        </S.CardWrapper>
    );
};
