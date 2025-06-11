import styles from './TextGuideStore.module.css';

interface TextGuideStoreProps {
    children?: React.ReactNode;
}

export default function TextGuideStore({ children }: TextGuideStoreProps) {
    return <div className={styles.textGuideStore}>{children}</div>;
}
