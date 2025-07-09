import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AccessTokenType, APIException, HttpMethod, ResponseData } from '@/types/Api';
import { AccessTokenService } from './accessTokenService';

const apiUrl = import.meta.env.VITE_API_URL || null;

if (!apiUrl) {
    alert('서비스 환경이 올바르게 설정되지 않았습니다. 잠시 후 다시 시도해주세요.');
    throw new Error('환경변수(API URL)가 설정되지 않았습니다.');
}

interface ErrorHandlingOptions {
    silent?: boolean;
    customMessage?: string;
}

type Result<T, E = APIException> = { success: true; data: T } | { success: false; error: E };

class GlobalErrorHandler {
    private static instance: GlobalErrorHandler;

    static getInstance() {
        if (!GlobalErrorHandler.instance) {
            GlobalErrorHandler.instance = new GlobalErrorHandler();
        }
        return GlobalErrorHandler.instance;
    }

    handleError(error: APIException, options: ErrorHandlingOptions = {}) {
        // 사일런트 모드가 아니면 알림 표시
        if (!options.silent) {
            let message = options.customMessage || error.message || 'API 오류가 발생했습니다.';

            if (error.statusCode === 500) {
                if (process.env.NODE_ENV === 'development') {
                    alert(`[500 Error] ${error.message}`);
                } else {
                    message = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
                    alert(message);
                    return;
                }
            } else {
                alert(message);
            }
        }
    }
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
 */
authApiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = AccessTokenService.get(AccessTokenType.USER);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

/**
 * 공통 에러 핸들러 - 개발 모드에서만 로깅
 * @param {AxiosError} error - Axios 오류 객체
 * @returns {APIException} - 처리된 오류 객체
 */
function handleError(error: AxiosError): APIException {
    if (error.response) {
        const status = error.response.status;
        const responseData = error.response.data as ResponseData<null>;

        // 404 에러는 조용히 처리 (댓글이 없는 정상적인 상황)
        if (status === 404) {
            return new APIException(status, 'Not found');
        }

        console.error('[API Error]', status, responseData?.message);
        return new APIException(status, responseData?.message || 'API Error');
    } else if (error.request) {
        if (process.env.NODE_ENV === 'development') {
            console.error('[Network Error]', error.message);
        }
        return new APIException(0, 'Network error');
    } else {
        if (process.env.NODE_ENV === 'development') {
            console.error('[Unknown Error]', error.message);
        }
        return new APIException(-1, 'Unknown error');
    }
}

/**
 * 인증이 필요한 API 요청 함수 - Result 패턴 적용
 * @template T - 반환할 데이터 타입
 * @param {HttpMethod} method - HTTP 메서드
 * @param {string} url - 요청할 엔드포인트 URL
 * @param {unknown} [data] - 요청 바디 데이터 (선택적)
 * @param {Record<string, unknown>} [config] - axios 설정 (선택적)
 * @param {ErrorHandlingOptions} [errorOptions] - 에러 처리 옵션 (선택적)
 * @returns {Promise<Result<T>>} - 성공/실패 정보를 포함한 결과
 */
export async function authRequest<T>(
    method: HttpMethod,
    url: string,
    data?: unknown,
    config?: Record<string, unknown>,
    errorOptions?: ErrorHandlingOptions,
): Promise<Result<T>> {
    try {
        const response = await authApiClient.request<T>({
            method,
            url,
            data,
            ...config,
        });

        return { success: true, data: response.data };
    } catch (error) {
        const apiError = handleError(error as AxiosError);

        GlobalErrorHandler.getInstance().handleError(apiError, errorOptions);

        return { success: false, error: apiError };
    }
}

/**
 * 인증이 필요 없는 API 요청 함수 - Result 패턴 적용
 * @template T - 반환할 데이터 타입
 * @param {HttpMethod} method - HTTP 메서드
 * @param {string} url - 요청할 엔드포인트 URL
 * @param {unknown} [data] - 요청 바디 데이터 (선택적)
 * @param {Record<string, unknown>} [config] - axios 설정 (선택적)
 * @param {ErrorHandlingOptions} [errorOptions] - 에러 처리 옵션 (선택적)
 * @returns {Promise<Result<T>>} - 성공/실패 정보를 포함한 결과
 */
export async function publicRequest<T>(
    method: HttpMethod,
    url: string,
    data?: unknown,
    config?: Record<string, unknown>,
    errorOptions?: ErrorHandlingOptions,
): Promise<Result<T>> {
    try {
        const response = await publicApiClient.request<T>({
            method,
            url,
            data,
            ...config,
        });

        return { success: true, data: response.data };
    } catch (error) {
        const apiError = handleError(error as AxiosError);

        GlobalErrorHandler.getInstance().handleError(apiError, errorOptions);

        return { success: false, error: apiError };
    }
}
