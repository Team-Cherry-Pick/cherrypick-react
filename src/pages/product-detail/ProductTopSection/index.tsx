// product-detail/ProductTopSection.tsx

import type { Deal } from '@/types/Deal';
import { IoMdEye } from "react-icons/io";
import { ThumbsUp, MessageSquare } from 'lucide-react';
import * as S from './ProductTopSection.style';

interface Props {
    deal: Deal;
}

const ProductTopSection = ({ deal }: Props) => {
    const mainImage = deal.imageUrls[0]?.url || '';
    const safeContent = (deal.content ?? '').replace(/<hr\s*\/?>/gi, '<div class="custom-divider"></div>');

    return (
        <S.Wrapper>
            {/* 왼쪽: 대표 이미지 + 썸네일 리스트 */}
            <S.ImageSection>
                <S.MainImageWrapper>
                    {mainImage ? (
                        <S.MainImage src={mainImage} alt={deal.title} />
                    ) : (
                        <S.ImagePlaceholder />
                    )}
                </S.MainImageWrapper>
                <S.ThumbnailRow>
                    {deal.imageUrls.map((img) => (
                        <S.Thumbnail key={img.imageId}>
                            <S.ThumbnailImage src={img.url} alt="썸네일" />
                        </S.Thumbnail>
                    ))}
                </S.ThumbnailRow>
            </S.ImageSection>

            {/* 오른쪽: 딜 상세 */}
            <S.DetailSection>
                <S.Title>{deal.title}</S.Title>
                <S.StoreTagContainer>
                    <S.StoreBadge>{deal.storeName}</S.StoreBadge>
                    <S.TagList>
                        {deal.discountNames.map((tag, idx) => (
                            <S.Tag key={idx}>#{tag}</S.Tag>
                        ))}
                    </S.TagList>
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
                        <span><IoMdEye size={14} /> {deal.viewCount}</span>
                        <span>|</span>
                        <span><ThumbsUp size={14} /> {deal.likeCount}</span>
                        <span>|</span>
                        <span><MessageSquare size={14} /> {deal.commentCount}</span>
                    </S.MetaRow>
                    <S.Divider />

                    <S.BottomActions>
                        <S.ShareButton>공유하기</S.ShareButton>
                        <S.BuyButton>구매하기</S.BuyButton>
                    </S.BottomActions>
                </S.BottomContainer>
            </S.DetailSection>
        </S.Wrapper>
    );
};

export default ProductTopSection;

