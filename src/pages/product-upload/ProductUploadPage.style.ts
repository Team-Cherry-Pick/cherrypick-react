import styled from 'styled-components';
import { MdArrowForwardIos } from 'react-icons/md';

export const TopBackground = styled.div`
  width: 100%;
  height: 43%;
  background: linear-gradient(135deg, #FF8067 0%, #FF4635 100%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

export const TopContent = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  text-align: center;
  color: white;
  padding: 0 ${({ theme }) => theme.spacing[32]};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.size.xxxl};
  line-height: 36px;
  font-family: Pretendard;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const Light = styled.span`
  font-weight: ${({ theme }) => theme.typography.weight.regular};
`;

export const Bold = styled.span`
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

export const GuideButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 ${({ theme }) => theme.spacing[32]};
`;

export const GuideButton = styled.button`
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 14px;
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};

  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.10);
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.background.card};
  color: ${({ theme }) => theme.colors.content.main};

  cursor: pointer;
  transition: background-color 0.2s;
`;

export const ArrowIcon = styled(MdArrowForwardIos)`
  width: 16px;
  height: 16px;
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Main = styled.div`
  padding-top: 290px;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  padding: 0 ${({ theme }) => theme.spacing[32]};
  position: relative;
`;

export const ContentWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.root};
  border-radius: ${({ theme }) => theme.radius[5]};
  padding: ${({ theme }) => theme.spacing[4]} 0;
`;

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: 0 ${({ theme }) => theme.spacing[10]};
  flex: 1;
  box-sizing: border-box;
`;

export const SectionTitle = styled.div`
  color: ${({ theme }) => theme.colors.content.main};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  line-height: 1rem;
  font-family: Pretendard;
  margin: ${({ theme }) => theme.spacing[2]} 0;
`;

export const SectionDivider = styled.div`
  border: none;
  height: 10px;
  background-color:  ${({ theme }) => theme.colors.neutral[20]};
  margin: ${({ theme }) => theme.spacing[6]} 0;
`;

export const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: ${({ theme }) => theme.spacing[2]};
`

export const TextBox = styled.div`
    display: flex;
    flex-direction: row;
    width: auto;
    gap: ${({ theme }) => theme.spacing[4]};
`
