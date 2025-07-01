import styles from './ModalSearchInput.module.css';
import SearchIcon from '@/assets/icons/search-Icon.svg?react';

interface ModalSearchInputProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    onConfirm: () => void;
    directInputLabel?: string;
    style?: React.CSSProperties;
}

export default function ModalSearchInput({
    placeholder,
    value,
    onChange,
    onConfirm,
    directInputLabel = '직접 입력',
    style,
}: ModalSearchInputProps) {
    return (
        <div className={styles.inputWrapper} style={style}>
            <div className={styles.inputContainer}>
                <input
                    className={styles.styledInput}
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={e => onChange(e.target.value)}
                />
                <button className={styles.iconButton}>
                    <SearchIcon width={16} height={16} />
                </button>
            </div>
            <button
                className={`${styles.directInputButton} ${value.trim().length > 0 && styles.active}`}
                onClick={onConfirm}
            >
                {directInputLabel}
            </button>
        </div>
    );
}
