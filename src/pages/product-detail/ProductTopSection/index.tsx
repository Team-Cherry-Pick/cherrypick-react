// product-detail/ProductTopSection.tsx
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { DetailedDeal } from '@/types/Deal';
import { IoMdEye } from "react-icons/io";
import { MessageSquare } from 'lucide-react';
import HeatFeedback from '@/components/detail/HeatFeedback';
import * as S from './ProductTopSection.style';
import BlackLogoIcon from '@/assets/icons/black-logo-Icon.svg';

interface Props {
    deal: DetailedDeal;
}

const ProductTopSection = ({ deal }: Props) => {
    const [mainImage, setMainImage] = useState(deal.imageUrls[0]?.url || '');
    const [hoverImage, setHoverImage] = useState<string | null>(null);
    const navigate = useNavigate();
    const safeContent = (deal.content ?? '').replace(/<hr\s*\/?>/gi, '<div class="custom-divider"></div>');
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

    const handleEndDeal = async () => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/deal`, {
                dealId: deal.dealId,
                isSoldOut: true,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            alert('핫딜이 종료되었습니다!');
            window.location.reload(); // 또는 상태 업데이트
        } catch (err) {
            alert('종료 처리에 실패했습니다.');
            console.error(err);
        }
    };

    const handleDeleteDeal = async () => {
        const confirmed = window.confirm('정말 삭제하시겠습니까?');
        if (!confirmed) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/deal/${deal.dealId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('삭제되었습니다!');
            navigate('/');
        } catch (err) {
            alert('삭제에 실패했습니다.');
            console.error(err);
        }
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
                            transform: 'scale(1.1)',
                            objectFit: 'contain',
                            borderRadius: '1rem',
                            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s ease-in-out',
                        }}
                    />
                </div>
            )}

            <S.Wrapper className={deal.soldout ? 'ended' : ''}>
                {deal.soldout && (
                    <S.Overlay>
                        종료된 핫딜입니다
                    </S.Overlay>
                )}
                {/* 왼쪽: 대표 이미지 + 썸네일 리스트 */}
                <S.ImageSection>
                    <S.MainImageWrapper>
                        <S.MainImage
                            src={hoverImage || mainImage || BlackLogoIcon}
                            alt={deal.title}
                            className={hoverImage ? 'hovered' : ''}
                            onClick={() => setEnlargedImage(hoverImage || mainImage)}
                            onError={e => {
                                const img = e.currentTarget as HTMLImageElement;
                                img.src = BlackLogoIcon;
                                img.style.height = '5rem';
                                img.style.width = '5rem';
                                img.style.objectFit = 'contain';
                            }}
                        />
                    </S.MainImageWrapper>
                    <S.ThumbnailRow>
                        {deal.imageUrls.map((img) => (
                            <S.Thumbnail
                                key={img.imageId}
                                onMouseEnter={() => setHoverImage(img.url)}
                                onMouseLeave={() => setHoverImage(null)}
                                onClick={() => setMainImage(img.url)}
                                className={mainImage === img.url ? 'active' : ''}
                            >
                                <S.ThumbnailImage src={img.url} alt="썸네일" />
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
                        <S.ActionGroup>
                            <S.ActionButton onClick={handleEndDeal}>종료처리</S.ActionButton>
                            <S.ActionButton onClick={() => console.log('수정')}>수정</S.ActionButton>
                            <S.ActionButton onClick={handleDeleteDeal}>삭제</S.ActionButton>
                        </S.ActionGroup>
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

                        <S.FinalPrice>
                            {deal.price.discountedPrice.toLocaleString()}원
                            <S.DiscountPercent>
                                {Math.round(
                                    ((deal.price.regularPrice - deal.price.discountedPrice) /
                                        deal.price.regularPrice) *
                                    100
                                )}
                                %
                            </S.DiscountPercent>
                        </S.FinalPrice>
                    </S.PriceContainer>
                    <S.Divider />

                    <S.Content dangerouslySetInnerHTML={{ __html: safeContent }} />

                    <S.BottomContainer>
                        <S.MetaRow>
                            <span>by {deal.user.userName}</span>
                            <span>|</span>
                            <span><IoMdEye size={14} /> {deal.totalViews}</span>
                            <span>|</span>
                            <span><MessageSquare size={14} /> {deal.totalComments}</span>
                        </S.MetaRow>
                        <S.Divider />

                        <S.BottomActions>
                            <HeatFeedback
                                heat={deal.heat}
                            />
                            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                                <S.ShareButton>공유하기</S.ShareButton>
                                <S.BuyButton>구매하기</S.BuyButton>
                            </div>
                        </S.BottomActions>
                    </S.BottomContainer>
                </S.DetailSection>
            </S.Wrapper>
        </>
    )
};

export default ProductTopSection;

