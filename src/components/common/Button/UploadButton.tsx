import styled, { css } from 'styled-components';

interface UploadButtonProps {
    disabled: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const UploadButton = ({ disabled, onClick, children }: UploadButtonProps) => {
    return (
        <StyledButton disabled={disabled} onClick={onClick}>
            {children}
        </StyledButton>
    );
};

export default UploadButton;

const StyledButton = styled.button<{ disabled: boolean }>`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.typography.size.base};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  color: ${({ theme }) => theme.colors.neutral[0]};
  cursor: pointer;
  transition: background-color 0.3s ease;

  ${({ theme, disabled }) =>
        disabled
            ? css`
          background-color: ${theme.colors.neutral[300]};
          cursor: not-allowed;
        `
            : css`
          background-color: ${theme.colors.primary};

        `}
`;
