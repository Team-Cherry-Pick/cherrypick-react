import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { AccessTokenType, APIException, HttpMethod, ResponseData } from '@/types/Api';
import { AccessTokenService } from './accessTokenService';

const apiUrl = import.meta.env.VITE_API_URL || null;

if (!apiUrl) {
    alert('서비스 환경이 올바르게 설정되지 않았습니다. 잠시 후 다시 시도해주세요.');
    throw new Error('환경변수(API URL)가 설정되지 않았습니다.');
}

// 인증이 필요 없는 공개 API용 axios 인스턴스
const publicApiClient = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 인증이 필요한 API용 axios 인스턴스
const authApiClient = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * 인증이 필요한 요청에 대한 인터셉터 설정
 * - 요청 시 Authorization 헤더 자동 추가
 * - 요청/응답/에러 콘솔 로깅
 */
authApiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = AccessTokenService.get(AccessTokenType.USER);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // console.log('[Auth Request]', config.method?.toUpperCase(), config.url, config);
        return config;
    },
    error => {
        console.error('[Auth Request Error]', error);
        return Promise.reject(error);
    },
);

authApiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // console.log('[Auth Response]', response.status, response.data);
        return response;
    },
    (error: AxiosError) => {
        console.error('[Auth API Error]', error);
        return Promise.reject(error);
    },
);

/**
 * 공통 에러 핸들러
 * @param {AxiosError} error - Axios 오류 객체
 * @returns {APIException} - 처리된 오류 객체
 */
function handleError(error: AxiosError) {
    if (error.response) {
        const responseData = error.response.data as ResponseData<null>;
        console.error('[API Error]', error.response.status, responseData?.message);
        return new APIException(error.response.status, responseData?.message || 'API Error');
    } else if (error.request) {
        console.error('[Network Error]', error.message);
        return new APIException(0, 'Network error');
    } else {
        console.error('[Unknown Error]', error.message);
        return new APIException(-1, 'Unknown error');
    }
}

/**
 * 인증이 필요한 API 요청 함수
 * @template T - 반환할 데이터 타입
 * @param {HttpMethod} method - HTTP 메서드
 * @param {string} url - 요청할 엔드포인트 URL
 * @param {unknown} [data] - 요청 바디 데이터 (선택적)
 * @returns {Promise<T>} - API 응답 데이터
 */
export async function authRequest<T>(
    method: HttpMethod,
    url: string,
    data?: unknown,
    config?: Record<string, unknown>,
): Promise<T> {
    try {
        const response = await authApiClient.request<T>({
            method,
            url,
            data,
            ...config,
        });
        return response.data;
    } catch (error) {
        return Promise.reject(handleError(error as AxiosError));
    }
}

/**
 * 인증이 필요 없는 API 요청 함수
 * @template T - 반환할 데이터 타입
 * @param {HttpMethod} method - HTTP 메서드
 * @param {string} url - 요청할 엔드포인트 URL
 * @param {unknown} [data] - 요청 바디 데이터 (선택적)
 * @returns {Promise<T>} - API 응답 데이터
 */
export async function publicRequest<T>(
    method: HttpMethod,
    url: string,
    data?: unknown,
    config?: Record<string, unknown>,
): Promise<T> {
    try {
        const response = await publicApiClient.request<T>({
            method,
            url,
            data,
            ...config,
        });

        return response.data;
    } catch (error) {
        return Promise.reject(handleError(error as AxiosError));
    }
}
