import styled from 'styled-components';

export const Wrapper = styled.section`
  display: block;
  flex: 1;
  margin: 0;
  padding: ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.radius[5]};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.background.card};
`;

export const Title = styled.h2`
  display: block;
  margin-top: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
`;

export const RecommendList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RecommendItem = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin: 0;
  gap: ${({ theme }) => theme.spacing[4]};
  cursor: pointer;
`;

export const Thumbnail = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background.root};
`;

export const StyledImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.radius[2]};
`;

export const StyledImage = styled.div<{ src: string }>`
  display: block;
  position: relative;

  width: 100%;
  height: 100%;

  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
`;

export const HeatBadgeWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  border: 1px solid ${({ theme }) => theme.colors.border.card};
  border-radius: 999px;
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
  display: block;
  flex: 1;
  margin: 0;
  padding: 0;
  border: none;
  color: ${({ theme }) => theme.colors.content.main};
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TagRow = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing[1]};
  gap: ${({ theme }) => theme.spacing[1]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

export const StoreName = styled.span`
  display: inline;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.content.sub};
`;

export const Tags = styled.span`
  display: inline;
  flex-shrink: 1;
  font-size: ${({ theme }) => theme.typography.size.sm};
  white-space: nowrap;
  overflow: hidden;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing[4]};
  gap: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

export const Percent = styled.span`
  display: inline;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Price = styled.span`
  display: inline;
  color: ${({ theme }) => theme.colors.content.main};
`;

export const Meta = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.colors.content.sub};
  margin-top: ${({ theme }) => theme.spacing[1]};

  svg {
    width: 10px;
    height: 10px;
    vertical-align: middle;
    color: ${({ theme }) => theme.colors.content.tertiary};
  }

  .divider {
    margin: 0 ${({ theme }) => theme.spacing[1]};
    color: ${({ theme }) => theme.colors.content.tertiary};
  }
`;

export const Divider = styled.div`
  display: block;
  height: 1px;
  margin: ${({ theme }) => theme.spacing[4]} 0;
  border: none;
  background-color: ${({ theme }) => theme.colors.border.board};
`;

export const ItemDivider = styled.div`
  display: block;
  height: 1px;
  margin: ${({ theme }) => theme.spacing[4]} 0;
  border: none;
  background-color: ${({ theme }) => theme.colors.border.board};
`;

export const VariousPriceText = styled.div`
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: 18px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  word-wrap: break-word;
  margin: 0;
  padding: 0;
`;
