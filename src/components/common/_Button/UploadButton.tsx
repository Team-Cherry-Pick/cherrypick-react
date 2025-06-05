import styles from './UploadButton.module.css';

interface UploadButtonProps {
    disabled: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export default function UploadButton({ disabled, onClick, children }: UploadButtonProps) {
    return (
        <button className={`${styles.styledButton} ${disabled && styles.disabled}`} onClick={onClick}>
            {children}
        </button>
    );
}
