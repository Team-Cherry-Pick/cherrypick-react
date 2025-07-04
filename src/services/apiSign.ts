import { HttpMethod } from '@/types/Api';
import { publicRequest } from './apiClient';

const apiUrl = import.meta.env.VITE_API_URL || null;

export const getAuthKakao = async (redirectPath: string) => {
    if (!apiUrl) {
        alert('서비스 환경이 올바르게 설정되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return;
    }

    window.location.href = `${apiUrl.replace(/\/api$/, '')}/oauth2/authorization/kakao?redirect=${redirectPath}`;
};

export const getAuthRefresh = async (): Promise<string> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await publicRequest<any>(HttpMethod.GET, `/auth/refresh`);

    if (result.success) {
        return result.data.accessToken;
    } else {
        throw new Error('Failed to get Auth refresh');
    }
};
