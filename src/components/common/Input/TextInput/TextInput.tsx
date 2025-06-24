import styles from './TextInput.module.css';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function TextInput(props: TextInputProps) {
    return <input className={styles.textInput} {...props} />;
}
