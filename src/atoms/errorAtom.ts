import { atom } from 'jotai';

export interface ErrorInfo {
    statusCode: number;
    message: string;
    type: 'server' | 'network' | 'unknown';
}

export const errorAtom = atom<ErrorInfo | null>(null);
