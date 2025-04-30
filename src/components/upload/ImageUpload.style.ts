import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 50%;
  background: ${({ theme }) => theme.colors.neutral[20]};
  border: 1px dashed ${({ theme }) => theme.colors.neutral[100]};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing[4]};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Icon = styled.img`
  width: ${({ theme }) => theme.typography.size.lg};
  height: ${({ theme }) => theme.typography.size.lg};
`;

export const GuideText = styled.p`
  font-size: ${({ theme }) => theme.typography.size.base};
  color: ${({ theme }) => theme.colors.content.sub};
`;

export const ImageCount = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing[3]};
  right: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.content.sub};
`;

export const PreviewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-content: flex-start;
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
`;

export const OrderBadge = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.background.card};

  &:hover {
    color: ${({ theme }) => theme.colors.content.sub};
}
`;
