// CardDeal.tsx
import * as S from './card.style';
import { Clock, ThumbsUp, MessageSquare } from 'lucide-react';

export const CardDeal = () => {
    return (
        <S.CardWrapper>
            <S.ImageBox>{/* 이미지 */}</S.ImageBox>
            <S.InfoBox>
                <S.Title>deal_title</S.Title>
                <S.TagRow>
                    <S.Store>store</S.Store>
                    <span> | </span>
                    <S.Tags>#무료배송 #쿠폰할인 #우리우리</S.Tags>
                </S.TagRow>
                <S.PriceRow>
                    <S.Percent>NN%</S.Percent>
                    <S.Price>NN,NNN원</S.Price>
                </S.PriceRow>
                <S.Meta>
                    <span><Clock />1시간 전</span>
                    <span className="divider">|</span>
                    <span><ThumbsUp />111</span>
                    <span className="divider">|</span>
                    <span><MessageSquare />11</span>
                </S.Meta>
            </S.InfoBox>
        </S.CardWrapper>
    );
};
