import styles from './BadgeLabel.module.css';

interface BadgeLabelProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

export default function BadgeLabel({ label, selected, onClick }: BadgeLabelProps) {
    return (
        <div className={`${styles.wrapper} ${selected && styles.selectedWrapper}`} onClick={onClick}>
            <div className={`${styles.label} ${selected && styles.selectedLabel}`}>{label}</div>
        </div>
    );
}
