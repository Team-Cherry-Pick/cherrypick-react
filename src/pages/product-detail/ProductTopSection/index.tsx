// product-detail/ProductTopSection.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { DetailedDeal } from '@/types/Deal';
import { IoMdEye } from "react-icons/io";
import HeatFeedback from '@/components/detail/HeatFeedback';
import * as S from './ProductTopSection.style';
import LogoPic from '@/assets/icons/LogoPic.svg';
import TalkBubbleIcon from '@/assets/icons/talkbubble.svg?react';
import { endDeal, deleteDeal } from '@/services/apiDeal';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';

interface Props {
    deal: DetailedDeal;
    onVoteChange?: () => void; // 투표 변경 시 부모 컴포넌트에서 데이터를 다시 가져오기 위한 콜백
}

const ProductTopSection = ({ deal, onVoteChange }: Props) => {
    const [mainImage, setMainImage] = useState(deal.imageUrls[0]?.url || '');
    const [hoverImage, setHoverImage] = useState<string | null>(null);
    const navigate = useNavigate();

    const safeContent = (deal.content ?? '').replace(/<hr\s*\/?>/gi, '<div class="custom-divider"></div>');
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
    const [localDeal, setLocalDeal] = useState(deal);

    const handleEndDeal = async () => {
        const confirmed = window.confirm('해당하는 핫딜이 품절/종료되었습니까?');
        if (!confirmed) return;
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
        if (!confirmed) return;
        try {
            await deleteDeal(localDeal.dealId);
            alert('삭제되었습니다!');
            navigate('/');
        } catch {
            alert('삭제에 실패했습니다.');
        }
    };

    const handleEditDeal = () => {
        navigate('/upload', { state: { deal: localDeal } });
    };

    return (
        <>
            {enlargedImage && (
                <div
                    onClick={() => setEnlargedImage(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                    }}
                >
                    <img
                        src={enlargedImage}
                        alt="확대 이미지"
                        style={{
                            maxWidth: '60vw',
                            maxHeight: '60vh',
                            transform: 'scale(1.5)',
                            objectFit: 'contain',
                            borderRadius: '1rem',
                            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s ease-in-out',
                        }}
                    />
                </div>
            )}

            <S.Wrapper className={localDeal.isSoldOut ? 'ended' : ''}>
                {localDeal.isSoldOut && (
                    <S.Overlay>
                        종료된 핫딜입니다
                    </S.Overlay>
                )}
                {/* 왼쪽: 대표 이미지 + 썸네일 리스트 */}
                <S.ImageSection>
                    <S.MainImageWrapper>
                        <S.MainImage
                            src={hoverImage || mainImage || LogoPic}
                            alt=""
                            className={hoverImage ? 'hovered' : ''}
                            onClick={() => setEnlargedImage(hoverImage || mainImage)}
                            onError={e => {
                                e.currentTarget.src = LogoPic;
                            }}
                        />
                    </S.MainImageWrapper>
                    <S.ThumbnailRow>
                        {deal.imageUrls.map((img) => (
                            <S.Thumbnail
                                key={img.imageId}
                                onMouseEnter={() => setHoverImage(img.url || '')}
                                onMouseLeave={() => setHoverImage(null)}
                                onClick={() => setMainImage(img.url || '')}
                                className={mainImage === img.url ? 'active' : ''}
                            >
                                {img.url ? (
                                    <S.ThumbnailImage
                                        src={img.url}
                                        alt="썸네일"
                                        onError={e => {
                                            e.currentTarget.src = LogoPic;
                                            e.currentTarget.classList.add('default-logo');
                                        }}
                                    />
                                ) : (
                                    <img src={LogoPic} alt="기본 이미지" className="default-logo" />
                                )}
                            </S.Thumbnail>
                        ))}
                    </S.ThumbnailRow>
                </S.ImageSection>

                {/* 오른쪽: 딜 상세 */}
                <S.DetailSection>
                    <S.Title>{deal.title}</S.Title>
                    <S.StoreTagContainer>
                        <S.StoreBadge>{deal?.store?.storeName ?? '알 수 없음'}</S.StoreBadge>
                        <S.TagList>
                            {deal.infoTags.map((tag, idx) => (
                                <S.Tag key={idx}>{tag}</S.Tag>
                            ))}
                        </S.TagList>
                        {AccessTokenService.hasToken(AccessTokenType.USER) && (
                            <S.ActionGroup>
                                <S.ActionButton onClick={handleEndDeal}>종료처리</S.ActionButton>
                                <S.ActionButton onClick={handleEditDeal}>수정</S.ActionButton>
                                <S.ActionButton onClick={handleDeleteDeal}>삭제</S.ActionButton>
                            </S.ActionGroup>
                        )}
                    </S.StoreTagContainer>
                    <S.Divider />
                    <S.PriceContainer>
                        <S.PriceBox>
                            <S.OriginalPrice>
                                {deal.price.regularPrice.toLocaleString()}원
                            </S.OriginalPrice>
                            <span>|</span>
                            <S.ShippingType>
                                {deal.shipping.shippingType === 'FREE' ? '무료배송' : '배송비 있음'}
                            </S.ShippingType>
                        </S.PriceBox>

                        {deal.price.priceType === 'VARIOUS' ? (
                            <S.VariousPriceText>다양한 가격</S.VariousPriceText>
                        ) : (
                            <S.FinalPrice>
                                {deal.price.discountedPrice.toLocaleString()}원
                                {(() => {
                                    const percent = Math.round(
                                        ((deal.price.regularPrice - deal.price.discountedPrice) /
                                            deal.price.regularPrice) *
                                        100
                                    );
                                    return isNaN(percent) ? null : <S.DiscountPercent>{percent}%</S.DiscountPercent>;
                                })()}
                            </S.FinalPrice>
                        )}
                    </S.PriceContainer>
                    <S.Divider />

                    <S.Content dangerouslySetInnerHTML={{ __html: safeContent }} />

                    <S.BottomContainer>
                        <S.MetaRow>
                            <span>by {deal.user.userName}</span>
                            <span className="meta-divider">|</span>
                            <span><IoMdEye size={14} className="meta-eye" /> {deal.totalViews}</span>
                            <span className="meta-divider">|</span>
                            <span><TalkBubbleIcon className="meta-bubble" /> {deal.totalComments}</span>
                        </S.MetaRow>
                        <S.Divider />

                        <S.BottomActions>
                            <HeatFeedback
                                heat={deal.heat}
                                dealId={deal.dealId}
                                initialVoteType={deal.voteType}
                                onVoteChange={onVoteChange} />
                            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
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
                            </div>
                        </S.BottomActions>
                    </S.BottomContainer>
                </S.DetailSection>
            </S.Wrapper>
        </>
    )
};

export default ProductTopSection;

