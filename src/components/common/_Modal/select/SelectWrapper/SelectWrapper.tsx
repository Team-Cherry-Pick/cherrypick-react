import styles from './SelectWrapper.module.css';

interface SelectWrapperProps {
    children?: React.ReactNode;
}

export default function SelectWrapper({ children }: SelectWrapperProps) {
    return <div className={styles.selectWrapper}>{children}</div>;
}
