import styles from './SelectTrigger.module.css';
import RightArrowIcon from '@/assets/icons/right-arrow-Icon.svg';

interface SelectTriggerProps {
    label: string;
    onClick?: () => void;
}

export default function SelectTrigger({ label, onClick }: SelectTriggerProps) {
    return (
        <button className={styles.styledSelectTrigger} onClick={onClick}>
            <span className={styles.label}>{label}</span>
            <img src={RightArrowIcon} alt="선택" />
        </button>
    );
}
