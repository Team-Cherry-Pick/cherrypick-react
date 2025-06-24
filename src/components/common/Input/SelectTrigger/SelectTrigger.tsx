import styles from './SelectTrigger.module.css';
import RightArrowIcon from '@/assets/icons/right-arrow-Icon.svg?react';

interface SelectTriggerProps {
    label: string;
    onClick?: () => void;
}

export function SelectTrigger({ label, onClick }: SelectTriggerProps) {
    return (
        <button className={styles.styledSelectTrigger} onClick={onClick}>
            <span className={styles.label}>{label}</span>
            <RightArrowIcon />
        </button>
    );
}
