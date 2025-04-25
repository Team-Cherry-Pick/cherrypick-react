import { useSetAtom } from 'jotai';
import { errorAtom, ErrorInfo } from '@/store/error';

export const useErrorHandler = () => {
    const setError = useSetAtom(errorAtom);

    const handleError = (err: unknown) => {
        if (err instanceof Error && 'statusCode' in err) {
            const { statusCode, message } = err as { statusCode: number; message: string };

            const type: ErrorInfo['type'] = (() => {
                if (statusCode >= 500) return 'server';
                if (statusCode === 0) return 'network';
                return 'unknown';
            })();

            setError({ statusCode, message, type });
        } else {
            setError({
                statusCode: -1,
                message: '알 수 없는 오류가 발생했어요.',
                type: 'unknown',
            });
        }
    };

    return { handleError };
};
