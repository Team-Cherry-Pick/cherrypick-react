// styles/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            content: {
                main: string;
                sub: string;
                tertiary: string;
            };
            background: {
                root: string;
                board: string;
                card: string;
            };
            border: {
                board: string;
                card: string;
            };
            neutral: {
                0: string;
                20: string;
                50: string;
                100: string;
                200: string;
                300: string;
                400: string;
                500: string;
                600: string;
                700: string;
                800: string;
                900: string;
            };
        };
        typography: {
            weight: {
                regular: string;
                medium: string;
                semibold: string;
                bold: string;
            };
            size: {
                xs: string;
                sm: string;
                base: string;
                lg: string;
                xl: string;
                xxl: string;
                xxxm: string;
                xxxl: string;
            };
            lineHeight: {
                tight: string;
                base: string;
                relaxed: string;
            };
        };
        spacing: Record<number, string>;
        radius: Record<number, string>;
        maxWidth: string;
    }
}
