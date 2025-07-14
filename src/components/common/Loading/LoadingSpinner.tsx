import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
    message?: string;
}

export function LoadingSpinner({ message }: LoadingSpinnerProps) {
    return (
        <Wrapper>
            <Spinner />
            {message && <LoadingText>{message}</LoadingText>}
        </Wrapper>
    );
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 0;
`;

export const Spinner = styled.div`
    width: 48px;
    height: 48px;
    border: 4px solid
        ${({ theme }) => {
            console.log(theme);
            return theme.colors.neutral[200];
        }};
    border-top: 4px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;

export const LoadingText = styled.div`
    margin-top: 16px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.content.sub};
`;
