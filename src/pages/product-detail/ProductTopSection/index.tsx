// product-detail/ProductTopSection.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { DetailedDeal } from '@/types/Deal';
import HeatFeedback from '@/components/detail/HeatFeedback';
import * as S from './ProductTopSection.style';
import { endDeal, deleteDeal } from '@/services/apiDeal';
import { AccessTokenService } from '@/services/accessTokenService';
import { useCarouselImages } from '@/hooks/useCarouselImages';
import { ImageCarousel } from './components/ImageCarousel';
import { useAtomValue } from 'jotai';
import { currentProfileAtom } from '@/store/profile';

interface Props {
    deal: DetailedDeal;
    onVoteChange?: () => void; // 투표 변경 시 부모 컴포넌트에서 데이터를 다시 가져오기 위한 콜백
}

const ProductTopSection = ({ deal, onVoteChange }: Props) => {
    const navigate = useNavigate();
    const carouselImages = useCarouselImages(deal.imageUrls);
    const currentProfile = useAtomValue(currentProfileAtom);

    const safeContent = (deal.content ?? '').replace(/<hr\s*\/?>/gi, '<div class="custom-divider"></div>');
    const [localDeal, setLocalDeal] = useState(deal);
    const isAuthor = AccessTokenService.hasToken() && currentProfile.userId === deal.user.userId;

    const handleEndDeal = async () => {
        const confirmed = window.confirm('해당하는 핫딜이 품절/종료되었습니까?');
        if (!confirmed || !isAuthor) return;
        try {
            await endDeal(localDeal.dealId);
            alert('핫딜이 종료되었습니다!');
            setLocalDeal({ ...localDeal, isSoldOut: true });
        } catch {
            alert('종료 처리에 실패했습니다.');
        }
    };

    const handleDeleteDeal = async () => {
        const confirmed = window.confirm('정말 삭제하시겠습니까?');
        if (!confirmed || !isAuthor) return;
        try {
            await deleteDeal(localDeal.dealId);
            alert('삭제되었습니다!');
            navigate('/');
        } catch {
            alert('삭제에 실패했습니다.');
        }
    };

    const handleEditDeal = () => {
        if (!isAuthor) return;
        navigate(`/upload/${localDeal.dealId}`);
    };

    return (
        <S.Wrapper className={localDeal.isSoldOut ? 'ended' : ''}>
            {localDeal.isSoldOut && (
                <S.Overlay>
                    종료된 핫딜입니다
                </S.Overlay>
            )}
            {/* 위: 이미지 캐러셀 */}
            <S.ImageSection>
                <ImageCarousel
                    images={carouselImages}
                />
            </S.ImageSection>

            {/* 아래: 딜 상세 */}
            <S.DetailSection>
                {deal.categorys && deal.categorys.length > 0 && (
                    <S.CategoryText>{deal.categorys.join(' > ')}</S.CategoryText>
                )}
                <S.Title>{deal.title}</S.Title>
                <S.StoreTagContainer>
                    <S.StoreBadge>{deal?.store?.storeName ?? '알 수 없음'}</S.StoreBadge>
                    <S.TagList>
                        {deal.infoTags.map((tag, idx) => (
                            <S.Tag key={idx + 1}>{tag}</S.Tag>
                        ))}
                    </S.TagList>
                    {isAuthor && (
                        <S.ActionGroup>
                            <S.ActionButton onClick={handleEndDeal}>종료처리</S.ActionButton>
                            <S.ActionButton onClick={handleEditDeal}>수정</S.ActionButton>
                            <S.ActionButton onClick={handleDeleteDeal}>삭제</S.ActionButton>
                        </S.ActionGroup>
                    )}
                </S.StoreTagContainer>
                <S.PriceContainer>
                    <S.PriceBox>
                        <S.DiscountPercent>최종 구매가격</S.DiscountPercent>
                        <S.OriginalPrice>
                            {deal.price.regularPrice.toLocaleString()}원
                        </S.OriginalPrice>
                    </S.PriceBox>

                    {deal.price.priceType === 'VARIOUS' ? (
                        <S.VariousPriceText>다양한 가격</S.VariousPriceText>
                    ) : (
                        <S.FinalPrice>
                            {deal.price.discountedPrice.toLocaleString()}원
                        </S.FinalPrice>
                    )}
                </S.PriceContainer>

                <S.Content dangerouslySetInnerHTML={{ __html: safeContent }} />

                <S.BottomContainer>
                    <S.MetaRow>
                        <span>{deal.user.userName}</span>
                        <span className="meta-divider">|</span>
                        <span>조회 {deal.totalViews}</span>
                        <span className="meta-divider">|</span>
                        <span>댓글 {deal.totalComments}</span>
                    </S.MetaRow>

                    <S.BottomActions>
                        <HeatFeedback
                            heat={deal.heat}
                            dealId={deal.dealId}
                            initialVoteType={deal.voteType}
                            onVoteChange={onVoteChange} />
                        <S.ShareButton
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                alert('게시글 주소가 복사되었습니다.');
                            }}
                        >
                            공유하기
                        </S.ShareButton>
                        <S.BuyButton
                            onClick={() => {
                                if (deal.originalUrl) {
                                    window.open(deal.originalUrl, '_blank');
                                }
                            }}
                        >
                            구매하기
                        </S.BuyButton>
                    </S.BottomActions>
                </S.BottomContainer>
            </S.DetailSection>
        </S.Wrapper>
    )
};

export default ProductTopSection;

