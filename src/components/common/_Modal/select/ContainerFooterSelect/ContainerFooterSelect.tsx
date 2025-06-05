import styles from './ContainerFooterSelect.module.css';

interface ContainerFooterSelectProps {
    children?: React.ReactNode;
}

export default function ContainerFooterSelect({ children }: ContainerFooterSelectProps) {
    return <div className={styles.containerFooterSelect}>{children}</div>;
}
