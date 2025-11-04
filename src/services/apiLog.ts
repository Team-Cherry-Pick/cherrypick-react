import { LogReq } from '@/types/Log';
import { publicRequest } from './apiClient';
import { HttpMethod } from '@/types/Api';

/**
 * 로그 전송 API
 * @param logType - 로그 타입 (예: "TEST_LOG", "PAGE_VIEW", "ERROR_LOG" 등)
 * @param logMap - 자유로운 형태의 로그 데이터 객체
 */
export const sendLog = async (logReq: LogReq): Promise<void> => {
    const result = await publicRequest(HttpMethod.POST, '/api/log', logReq, {}, { silent: true });
    
    if (result.success) {
        return;
    } else {
        throw result.error;
    }
}