import styled from 'styled-components';

export const SectionWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  align-items: flex-start;
  width: 40%;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing[2]};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;
  align-items: flex-start;
`;

export const SectionTitle = styled.div`
  color: ${({ theme }) => theme.colors.content.main};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  margin-left: ${({ theme }) => theme.spacing[2]};
`;

export const PreviewWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: ${({ theme }) => theme.spacing[2]};

  & > *:not(:first-child) {
    margin-left: ${({ theme }) => theme.spacing[2]};
  }
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
  flex-shrink: 0;
`;

export const RepresentativeBadge = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.size.xs};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  z-index: 2;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

export const UploadBox = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
  border: 1px dashed ${({ theme }) => theme.colors.neutral[100]};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.neutral[20]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.content.sub};
  font-size: ${({ theme }) => theme.typography.size.sm};
  cursor: pointer;
  flex-shrink: 0;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const ImageCount = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing[1]};
  right: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  color: ${({ theme }) => theme.colors.content.sub};
`;


export const Icon = styled.img`
  width: ${({ theme }) => theme.typography.size.lg};
  height: ${({ theme }) => theme.typography.size.lg};
`;

export const GuideText = styled.p`
  font-size: ${({ theme }) => theme.typography.size.base};
  color: ${({ theme }) => theme.colors.content.sub};
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
  border-radius: 12px;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const RepresentativeLabel = styled.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 500;
`;
