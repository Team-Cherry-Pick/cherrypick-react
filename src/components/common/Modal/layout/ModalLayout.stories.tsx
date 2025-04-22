import type { Meta, StoryObj } from '@storybook/react';
import { ModalLayout } from './ModalLayout';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/styles/theme';

const meta: Meta<typeof ModalLayout> = {
    title: 'Common/ModalLayout',
    component: ModalLayout,
    tags: ['autodocs'],
    decorators: [
        Story => <ThemeProvider theme={lightTheme}><Story /></ThemeProvider>
    ],
};

export default meta;
type Story = StoryObj<typeof ModalLayout>;

export const StoreSelect: Story = {
    args: {
        title: '스토어 선택',
    },
};
