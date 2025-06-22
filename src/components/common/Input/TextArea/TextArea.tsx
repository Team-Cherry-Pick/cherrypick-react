import styles from './TextArea.module.css';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea(props: TextAreaProps) {
    return <textarea className={styles.textArea} {...props} />;
}
