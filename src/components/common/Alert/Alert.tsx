import * as S from './alert.style';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '@/styles/theme';

interface AlertProps {
    text: string;
    cancelable?: boolean;
    dark?: boolean;
}

export const Alert = ({ text, cancelable = false, dark = false }: AlertProps) => {
    const content = (
        <S.AlertWrapper dark={dark}>
            <S.AlertText dark={dark}>{text}</S.AlertText>
            <S.ButtonRow>
                {cancelable && <S.CancelButton dark={dark}>CANCEL</S.CancelButton>}
                <S.ConfirmButton dark={dark}>OK</S.ConfirmButton>
            </S.ButtonRow>
        </S.AlertWrapper>
    );

    return dark ? <ThemeProvider theme={darkTheme}>{content}</ThemeProvider> : content;
};
