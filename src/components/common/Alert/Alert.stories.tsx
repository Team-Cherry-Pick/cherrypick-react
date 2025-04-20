import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
    title: 'Components/Alert',
    component: Alert,
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const NotCancelable: Story = {
    args: {
        text: 'ALERT_TEXT_ALERT_TEXT_ALERT_TEXT_ALERT_TEXTALERT_TEXT_ALERT_TEXT_ALERT_TEXT_ALERT_TEXT_ALERT_TEXT',
        cancelable: false,
    },
};

export const Cancelable: Story = {
    args: {
        text: 'ALERT_TEXT_ALERT_TEXT_ALERT_TEXT_ALERT_TEXT_ALERT_TEXT_ALERT_TEXT_ALERT_TEXT_ALERT_TEXT_ALERT_TEXT',
        cancelable: true,
    },
};

export const DarkMode: Story = {
    args: {
        text: 'ALERT_TEXT__ALERT_TEXTALERT_TEXT_ALERT_TEXT_ALERT_TEXTALERT_TEXT_ALERT_TEXT_ALERT_TEXT_ALERT_TEXT',
        cancelable: true,
        dark: true,
    },
};
