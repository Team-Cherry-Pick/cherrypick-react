import styles from './Button.module.css';
import { createBoundClassNames } from '@/utils/classNameBinder';
import { HTMLAttributes, PropsWithChildren } from 'react';

const cx = createBoundClassNames(styles);

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant?: 'main' | 'sub' | 'disabled';
    size?: 'short' | 'long';
}

export const Button = ({
    variant = 'main',
    size = 'short',
    children,
    className,
    ...props
}: PropsWithChildren<ButtonProps>) => {
    return (
        <button className={cx('button', `variant-${variant}`, `size-${size}`, className)} {...props}>
            {children}
        </button>
    );
};
