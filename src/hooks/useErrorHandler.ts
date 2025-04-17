// hooks/useErrorHandler.ts
import { useSetRecoilState } from 'recoil';
import { errorState, ErrorInfo } from '@/store/errorStore';

export const useErrorHandler = () => {
    const setError = useSetRecoilState(errorState);

    const handleError = (err: unknown) => {
        if (err instanceof Error && 'statusCode' in err) {
            const { statusCode, message } = err as { statusCode: number; message: string };

            const type: ErrorInfo['type'] = (() => {
                if (statusCode >= 500) return 'server'; // 서버 관련 에러인 경우
                if (statusCode === 0) return 'network'; // 500이 아닌 것은 네트워크 문제
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
