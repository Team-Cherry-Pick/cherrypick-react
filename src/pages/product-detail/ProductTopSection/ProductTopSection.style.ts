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
  flex-direction: column;
  height: 100%;
  border-radius: 0;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  background-color: transparent;
  padding: 0 1.25rem;

  &.ended {
    filter: grayscale(100%);
    pointer-events: auto;
  }
`;

export const ImageSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding-top: 1.25rem;
`;

export const MainImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  overflow: hidden;
  border-radius: 0.5rem;
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  border: 1px solid ${({ theme }) => theme.colors.border.card};

  &.hovered {
    opacity: 0.6;
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

export const DetailSection = styled.div`
  width: auto;
  display: flex;
  flex: 1;
  position: relative;
  flex-direction: column;
  padding: 2rem 0;
`;

export const Divider = styled.div`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.board};
  margin: ${({ theme }) => theme.spacing[1]} 0;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.content.main};
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

export const StoreTagContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    margin-top: 0.5rem;
`;

export const StoreBadge = styled.div`
  padding: 0.25rem 0.5rem;
  background: ${({ theme }) => theme.colors.neutral[400]};
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.25rem;
  width: fit-content;
`;

export const TagList = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  padding: 0.25rem 0.5rem;
  background: ${({ theme }) => theme.colors.neutral[300]};
  color: white;
  font-size: 0.875rem;
  border-radius: 0.25rem;
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
  margin-top: 1.5rem;
`;

export const PriceBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin: 0;
`;

export const OriginalPrice = styled.div`
  margin-left: 0.25rem;
  text-decoration: line-through;
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: 1.125rem;
`;

export const ShippingType = styled.div`
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.base};
`;

export const FinalPrice = styled.div`
  display: flex;
  margin-top: 0.5rem;
  align-items: flex-end;
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.content.main};
  line-height: 1;
`;

export const DiscountPercent = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.125rem;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

export const Content = styled.div`
    font-size: 1.125rem;
    color: ${({ theme }) => theme.colors.content.main};
    line-height: 1.5;
    word-break: break-word;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
    margin-top: 2rem;
`;

export const MetaRow = styled.div`
  margin-top: ${({ theme }) => theme.spacing[4]};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: 1rem;
  line-height: 1.2;
  margin-top: 2.5rem;

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
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
  margin-top: 1rem;
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
