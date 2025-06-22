import styled from 'styled-components';
import { useEffect, useState } from 'react';
import type { RecommendedDeal } from '@/types/Deal';
import { getTimeAgo } from '@/utils/date';
import { Clock, ThumbsUp, MessageSquare } from 'lucide-react';
import { recommendedMockDeals } from '@/mocks/mockDeals';

const ProductRecommend = () => {
    const [deals, setDeals] = useState<RecommendedDeal[]>([]);

    // 마치 API 호출한 것처럼
    useEffect(() => {
        const fetchDeals = async () => {
            // 실제 API 연결 전까지는 mock 사용
            // 나중에 fetch('/api/deal/recommend') 등으로 교체
            setDeals(recommendedMockDeals);
        };

        fetchDeals();
    }, []);
    return (
        <Wrapper>
            <Title>지금 뜨고 있는 비슷한 핫딜</Title>
            <Divider />
            <RecommendList>
                {deals.map((deal, index) => (
                    <>
                        <RecommendItem key={deal.dealId}>
                            <Thumbnail>
                                {deal.imageUrls[0] ? (
                                    <img src={deal.imageUrls[0].url} alt={deal.title} />
                                ) : (
                                    <ThumbnailPlaceholder />
                                )}
                            </Thumbnail>
                            <Info>
                                <TopRow>
                                    <DealTitle>{deal.title}</DealTitle>
                                </TopRow>
                                <TagRow>
                                    <StoreName>{deal.store}</StoreName>
                                    <span>|</span>
                                    {deal.infoTags.map((tag, idx) => (
                                        <Tag key={idx}>{tag}</Tag>
                                    ))}
                                </TagRow>

                                <PriceRow>
                                    <DiscountPercent>
                                        {Math.round(
                                            ((deal.price.regularPrice - deal.price.discountedPrice) /
                                                deal.price.regularPrice) * 100
                                        )}
                                        %
                                    </DiscountPercent>
                                    <DiscountedPrice>
                                        {deal.price.discountedPrice.toLocaleString()}원
                                    </DiscountedPrice>
                                </PriceRow>
                                <MetaRow>
                                    <span><Clock size={12} /> {getTimeAgo(deal.createdAt)}</span>
                                    <span>|</span>
                                    <span><ThumbsUp size={12} /> {deal.totalLikes}</span>
                                    <span>|</span>
                                    <span><MessageSquare size={12} /> {deal.totalComments}</span>
                                </MetaRow>
                            </Info>
                        </RecommendItem>
                        {index !== deals.length - 1 && <ItemDivider />}
                    </>
                ))}
            </RecommendList>
        </Wrapper >
    );
};

export default ProductRecommend;

// 스타일
const Wrapper = styled.section`
    flex:1;
  border-radius: ${({ theme }) => theme.radius[5]};
  box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.border.card};
  background-color: ${({ theme }) => theme.colors.background.root};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
`;

const RecommendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2.5]};
`;

const RecommendItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;
`;

const Thumbnail = styled.div`
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => theme.radius[2]};
  background-color: ${({ theme }) => theme.colors.border.card};
  border: 1px solid ${({ theme }) => theme.colors.border.card};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbnailPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
`;

const Info = styled.div`
   display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
`;

const DealTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.content.main};
`;

const TagRow = styled.div`
  margin-top: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.sm};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const StoreName = styled.span`
  color: ${({ theme }) => theme.colors.content.sub};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

const Tag = styled.span`
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

const PriceRow = styled.div`
  margin-top: ${({ theme }) => theme.spacing[4]};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const DiscountPercent = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const DiscountedPrice = styled.span`
  color: ${({ theme }) => theme.colors.content.main};
`;

export const Divider = styled.div`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.board};
  margin: ${({ theme }) => theme.spacing[3]} 0;
`;

export const MetaRow = styled.div`
  margin-top: ${({ theme }) => theme.spacing[1]};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.xs};
  line-height: 1.2;

  span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
`;

export const ItemDivider = styled.div`
  border: none;
  height: 0.5px;
  background-color: ${({ theme }) => theme.colors.border.board};
  margin: 0;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  overflow: hidden;

  ${DealTitle} {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
