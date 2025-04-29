// TextInput.tsx
import styled from 'styled-components';

export const TextInput = styled.input`
    display: flex;
    width: 100%;
    padding: 12px 16px;
    align-items: center;
    gap: 10px;

    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
    background: ${({ theme }) => theme.colors.neutral[0]};

    font-size: 14px;
    color: ${({ theme }) => theme.colors.content.main};
    outline: none;
    `;

