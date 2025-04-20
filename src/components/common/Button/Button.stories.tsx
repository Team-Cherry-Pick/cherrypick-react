import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const ShortMain: Story = {
    args: {
        variant: 'main',
        size: 'short',
        children: 'short',
    },
};

export const ShortSub: Story = {
    args: {
        variant: 'sub',
        size: 'short',
        children: 'short',
    },
};

export const ShortDisabled: Story = {
    args: {
        variant: 'disabled',
        size: 'short',
        children: 'short',
    },
};

export const LongMain: Story = {
    args: {
        variant: 'main',
        size: 'long',
        children: 'loooooooong',
    },
};

export const LongSub: Story = {
    args: {
        variant: 'sub',
        size: 'long',
        children: 'loooooooong',
    },
};

export const LongDisabled: Story = {
    args: {
        variant: 'disabled',
        size: 'long',
        children: 'loooooooong',
    },
};
