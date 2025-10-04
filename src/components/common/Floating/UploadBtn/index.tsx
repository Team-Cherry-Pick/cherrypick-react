// components/common/Floating/UploadButton.tsx
import styled, { css, keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRequireLogin } from '@/hooks/useRequireLogin';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';

const UploadBtn = () => {
    const navigate = useNavigate();
    const { guard } = useRequireLogin();
    const isMobile = useIsMobileViewport();

    const handleClick = () => {
        if (!guard()) return;
        navigate('/upload');
    };

    return (
        <Wrapper onClick={handleClick}>
            <SparkleText>
                <RocketEmoji>🚀</RocketEmoji>
                {isMobile ? ' 특가할인, AI로 지금 바로 업로드' : ' 특가할인, AI로 지금 바로 업로드'}
            </SparkleText>
        </Wrapper>
    );
};

export default UploadBtn;

// 반짝이는 효과 키프레임
const sparkle = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

const SparkleText = styled.span`
  position: relative;
  display: inline-block;
`;

const RocketEmoji = styled.span`
  font-family: 'TossFace', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.1em;
`;

const Wrapper = styled.button`
  display: flex;
  width: auto;
  height: 40px;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: 0 12px;
  background: ${({ theme }) => css`
    linear-gradient(
      90deg,
      #e02500ff 0%,
      #7d1500ff 100%
    )
  `};
  color: white;
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  border-radius: 24px;
  cursor: pointer;
  border: none;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: ${sparkle} 4s infinite;
    animation-delay: 2s;
  }
`;
