import { StyledButton } from './button.style';
import { HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant: 'main' | 'sub' | 'disabled';
    size: 'short' | 'long';
    children: string;
}

export const Button = ({ variant, size, children, ...props }: ButtonProps) => {
    return (
        <StyledButton variant={variant} size={size} {...props}>
            {children}
        </StyledButton>
    );
};
