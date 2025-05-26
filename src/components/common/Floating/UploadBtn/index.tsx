// components/common/Floating/UploadButton.tsx
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRequireLogin } from '@/hooks/useRequireLogin';
import { HiFire } from 'react-icons/hi2';

const UploadBtn = () => {
    const navigate = useNavigate();
    const { guard } = useRequireLogin();

    const handleClick = () => {
        if (!guard()) return;
        navigate('/upload');
    };
    return (
        <Wrapper onClick={handleClick}>
            <HiFire size={20} />
            <span>내가 찾은 핫딜 업로드</span>
        </Wrapper>
    );
};

export default UploadBtn;

const Wrapper = styled.button`
  display: flex;
  width: auto;
  height: 48px;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => css`
    linear-gradient(
      90deg,
      #FF8067 0%,
      ${theme.colors.primary} 100%
    )
  `};
  color: white;
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  border-radius: ${({ theme }) => theme.radius[4]};
  cursor: pointer;
  border: none;
`;
