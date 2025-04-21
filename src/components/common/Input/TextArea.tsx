// TextArea.tsx
import styled from 'styled-components';

export const TextArea = styled.textarea`
    display: flex;
    width: 436px;
    height: 216px;
    padding: 16px;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
    background: ${({ theme }) => theme.colors.neutral[0]};

    font-size: 14px;
    color: ${({ theme }) => theme.colors.content.main};
    resize: none;
    outline: none;
    `;
