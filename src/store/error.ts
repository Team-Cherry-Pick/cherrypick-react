// src/store/error.ts
import { atom } from 'jotai';

export type ErrorType = 'server' | 'network' | 'unknown';

export interface ErrorInfo {
    statusCode: number;
    message: string;
    type: ErrorType;
}

export const errorAtom = atom<ErrorInfo | null>(null);
