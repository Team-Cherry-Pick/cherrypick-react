// components/detail/ProductRecommend/ProductRecommend.style.ts
import styled from 'styled-components';

export const Wrapper = styled.section`
  width: 34%;
  flex: 1;
  border-radius: ${({ theme }) => theme.radius[5]};
  box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.border.card};
  background-color: ${({ theme }) => theme.colors.background.root};
  padding: ${({ theme }) => theme.spacing[4]};
`;

export const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
`;

export const RecommendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};

`;

export const RecommendItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;
  cursor: pointer;
    margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

export const Thumbnail = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => theme.radius[2]};
  background-color: ${({ theme }) => theme.colors.background.root};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  padding: 3px;
  box-sizing: border-box;
`;

export const StyledImageWrapper = styled.div`
    width: 100%;
  height: 100%;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HeatBadgeWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 30%);
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border: 1px solid ${({ theme }) => theme.colors.border.card};
  border-radius: 999px;
  padding: 0 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  overflow: hidden;
`;

export const DealTitle = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.colors.content.main};
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TagRow = styled.div`
  margin-top: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.sm};
  display: flex;
  gap: ${({ theme }) => theme.spacing[1]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StoreName = styled.span`
  color: ${({ theme }) => theme.colors.content.sub};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

export const Tags = styled.span`
  font-size: ${({ theme }) => theme.typography.size.sm};
  white-space: nowrap;
  overflow: hidden;
  flex-shrink: 1;
`;

export const PriceRow = styled.div`
  margin-top: ${({ theme }) => theme.spacing[3]};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Percent = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Price = styled.span`
  color: ${({ theme }) => theme.colors.content.main};
`;

export const Meta = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.colors.content.sub};

  svg {
    color: ${({ theme }) => theme.colors.content.tertiary};
    width: 10px;
    height: 10px;
    vertical-align: middle;
  }

  .divider {
    margin: 0 ${({ theme }) => theme.spacing[1]};
    color: ${({ theme }) => theme.colors.content.tertiary};
  }
`;

export const Divider = styled.div`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.board};
  margin: ${({ theme }) => theme.spacing[3]} 0;
`;

export const ItemDivider = styled.div`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.board};
  margin: 0;
`;
