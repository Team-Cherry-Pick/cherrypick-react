// store/errorStore.ts
import { atom } from 'recoil';

export interface ErrorInfo {
    statusCode: number;
    message: string;
    type: 'server' | 'network' | 'unknown';
}

export const errorState = atom<ErrorInfo | null>({
    key: 'errorState',
    default: null,
});
