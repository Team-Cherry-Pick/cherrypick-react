import { LogReq } from '@/types/Log';
import { publicRequest } from './apiClient';
import { HttpMethod } from '@/types/Api';

/**
 * null 값을 "Unknown"으로 변환하는 유틸리티 함수
 */
const replaceNullWithUnknown = (obj: Record<string, unknown>): Record<string, unknown> => {
    const result: Record<string, unknown> = {};
    
    for (const [key, value] of Object.entries(obj)) {
        if (value === null || value === undefined) {
            result[key] = 'Unknown';
        } else if (typeof value === 'object' && !Array.isArray(value)) {
            result[key] = replaceNullWithUnknown(value as Record<string, unknown>);
        } else {
            result[key] = value;
        }
    }
    
    return result;
};

/**
 * 로그 전송 API
 * @param logType - 로그 타입 (예: "TEST_LOG", "PAGE_VIEW", "ERROR_LOG" 등)
 * @param logMap - 자유로운 형태의 로그 데이터 객체
 */
export const sendLog = async (logReq: LogReq): Promise<void> => {
    // logMap의 모든 null/undefined 값을 "Unknown"으로 변환
    const sanitizedLogReq: LogReq = {
        logType: logReq.logType,
        logMap: replaceNullWithUnknown(logReq.logMap),
    };

    const result = await publicRequest(HttpMethod.POST, '/log', sanitizedLogReq, {}, { silent: true });
    
    if (result.success) {
        return;
    } else {
        throw result.error;
    }
}