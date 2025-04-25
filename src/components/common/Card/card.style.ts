import styled from 'styled-components';

export const CardWrapper = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius[3]};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.card};
  display: flex;
  flex-direction: column;
`;

export const ImageBox = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
`;

export const InfoBox = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.content.main};
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

export const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Store = styled.span`
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

export const Tags = styled.span`
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};
  margin: ${({ theme }) => `${theme.spacing[2]} 0 ${theme.spacing[1]} 0`};
`;

export const Percent = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

export const Price = styled.span`
  color: ${({ theme }) => theme.colors.content.main};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
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
