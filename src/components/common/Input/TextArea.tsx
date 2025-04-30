// TextArea.tsx
import styled from 'styled-components';

export const TextArea = styled.textarea`
    display: flex;
    width: 100%;
    min-height: 12rem;
    max-height: 20rem;
    padding: 16px;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
    background: ${({ theme }) => theme.colors.neutral[0]};

    font-size: ${({ theme }) => theme.typography.size.sm};
    color: ${({ theme }) => theme.colors.content.main};
    resize: vertical;
    outline: none;
    `;
