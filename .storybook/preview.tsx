// .storybook/preview.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../src/styles/theme';
import type { Preview } from '@storybook/react';

const preview: Preview = {
    decorators: [
        (Story) => (
            <ThemeProvider theme={lightTheme} >
                <Story />
            </ThemeProvider>
        ),
    ],
};

export default preview;
