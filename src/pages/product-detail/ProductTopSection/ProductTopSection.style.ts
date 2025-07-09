import styled, { css } from 'styled-components';

export const Overlay = styled.div`
  position: absolute;
  top: 0; left: 0;
  border-radius: ${({ theme }) => theme.radius[5]};
  width: 100%; 
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
`;

export const EndButton = styled.button`
  margin-right: auto;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.neutral[50]};
  border: none;
  border-radius: ${({ theme }) => theme.radius[2]};
  cursor: pointer;
  font-size: 0.9rem;
`;

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  gap: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radius[5]};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.background.card};
  margin-top: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[4]};

  &.ended {
    filter: grayscale(100%);
    pointer-events: auto;
  }
`;

export const ImageSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const MainImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rem;
  height: 30rem;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border.card};
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  border: 1px solid ${({ theme }) => theme.colors.border.card};

  &.hovered {
    opacity: 0.6;
  }
`;

export const DefaultImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 5rem;
    height: 5rem;
    object-fit: contain;
  }
`;

export const ImagePlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  border: 1px solid ${({ theme }) => theme.colors.border.card};
  border-radius: 8px;
`;

export const ThumbnailRow = styled.div`
  margin-top: ${({ theme }) => theme.spacing[2]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Thumbnail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.border.card};
  border: 1px solid ${({ theme }) => theme.colors.border.card};
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;

  img.default-logo {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DetailSection = styled.div`
  width: auto;
  display: flex;
  flex: 1;
  position: relative;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2.5]};
  padding-left:  ${({ theme }) => theme.spacing[2]};
`;

export const Divider = styled.div`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.board};
  margin: ${({ theme }) => theme.spacing[1]} 0;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.content.main};
  font-size: ${({ theme }) => theme.typography.size.xxxm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

export const StoreTagContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing[3]};
    align-items: center;
`;

export const StoreBadge = styled.div`
  padding: 4px 12px;
  background: #1fba1f;
  color: white;
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: 600;
  border-radius: 8px;
  width: fit-content;
`;

export const TagList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Tag = styled.span`
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: 400;
`;

export const ActionGroup = styled.div`
  display: flex;
    gap: ${({ theme }) => theme.spacing[2]};
  margin-left: auto;
`;

export const ActionButton = styled.button`
  font-size: ${({ theme }) => theme.typography.size.sm};
  text-decoration: underline;
  background-color: none;
  color: ${({ theme }) => theme.colors.content.main};
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[300]};
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
`;

export const PriceBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin: 0;
`;

export const OriginalPrice = styled.div`
  text-decoration: line-through;
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.base};
`;

export const ShippingType = styled.div`
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.base};
`;

export const FinalPrice = styled.div`
  display: flex;
  margin: 0;
  align-items: flex-end;
  font-size: ${({ theme }) => theme.typography.size.xxxm};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme }) => theme.colors.content.main};
`;

export const DiscountPercent = styled.span`
  margin-left: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.size.xxxm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

export const Content = styled.div`
    margin: ${({ theme }) => theme.spacing[3]} 0;
    font-size: ${({ theme }) => theme.typography.size.lg};
    color: ${({ theme }) => theme.colors.content.main};
    line-height: 1.5;
    word-break: break-word;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
    .custom-divider {
        height: 1px;
        background-color: ${({ theme }) => theme.colors.border.board};
        margin: ${({ theme }) => theme.spacing[6]} 0;
    }
`;

export const MetaRow = styled.div`
  margin-top: ${({ theme }) => theme.spacing[4]};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.2;

  span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .meta-divider {
    color: ${({ theme }) => theme.colors.neutral[300]};
  }
  .meta-eye {
    color: ${({ theme }) => theme.colors.content.tertiary};
  }
  .meta-bubble {
    width: 12px;
    height: 12px;
    vertical-align: middle;
  }
`;

export const BottomActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  justify-content: flex-end;
`;

export const ShareButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing[5]} ${theme.spacing[16]}`};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.neutral[900]};
  color: ${({ theme }) => theme.colors.neutral[0]};
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  border: none;
  cursor: pointer;
`;

export const BuyButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing[5]} ${theme.spacing[16]}`};
  border-radius: 8px;
  background: ${({ theme }) => css`
    linear-gradient(
      90deg,
      #FF8067 0%,
      ${theme.colors.primary} 100%
    )
  `};
  color: #ffffff;
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  border: none;
  cursor: pointer;
`;

export const BottomContainer = styled.div`
  margin-top: auto;
  bottom: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
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
