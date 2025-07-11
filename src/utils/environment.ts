// src/utils/environment.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL;
export const API_URL = API_BASE_URL;
export const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
export const MODE = import.meta.env.MODE;

export const IS_DEVELOPMENT = MODE === 'development';
export const IS_PRODUCTION = MODE === 'production';

// 추가: ENV 객체로 한 번에 묶어서 내보내기
export const ENV = {
    API_URL,
    ENCRYPTION_KEY,
    MODE,
    IS_DEVELOPMENT,
    IS_PRODUCTION,
};