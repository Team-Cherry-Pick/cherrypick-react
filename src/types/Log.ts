export interface LogReq {
    logType: string;
    logMap: Record<string, unknown>;
}

/**
 * URL에서 숫자로만 구성된 세그먼트를 ?로 변환
 */
export const sanitizeLandingPage = (url: string): string => {
    const urlObj = new URL(url, window.location.origin);
    const segments = urlObj.pathname.split('/');
    const sanitizedSegments = segments.map(segment => {
        // 숫자로만 구성된 세그먼트를 ?로 변환
        return /^\d+$/.test(segment) ? '?' : segment;
    });
    return sanitizedSegments.join('/') + urlObj.search;
};

/**
 * 유입 경로 확인 (Referrer)
 */
export const getInflowSource = (): string => {
    if (document.referrer) {
        try {
            const referrerUrl = new URL(document.referrer);
            // 같은 도메인에서 온 경우 'Direct'로 처리
            if (referrerUrl.hostname === window.location.hostname) {
                return 'Direct';
            }
            return referrerUrl.origin;
        } catch {
            return 'Unknown';
        }
    }
    return 'Direct';
};

/**
 * User Agent 파싱하여 브라우저 정보 추출
 */
export const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    let version = 'Unknown';
    let os = 'Unknown';

    // OS 감지
    if (/android/i.test(userAgent)) {
        os = 'Android';
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        os = 'iOS';
    } else if (/Mac/i.test(userAgent)) {
        os = 'macOS';
    } else if (/Win/i.test(userAgent)) {
        os = 'Windows';
    } else if (/Linux/i.test(userAgent)) {
        os = 'Linux';
    }

    // 브라우저 감지 (순서 중요: 더 구체적인 것부터 체크)
    if (/Edg\//i.test(userAgent)) {
        browser = 'Edge';
        const match = userAgent.match(/Edg\/(\S+)/);
        version = match ? match[1] : 'Unknown';
    } else if (/Chrome/i.test(userAgent) && !/Edg/i.test(userAgent)) {
        browser = 'Chrome';
        const match = userAgent.match(/Chrome\/(\S+)/);
        version = match ? match[1] : 'Unknown';
    } else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
        browser = 'Safari';
        const match = userAgent.match(/Version\/(\S+)/);
        version = match ? match[1] : 'Unknown';
    } else if (/Firefox/i.test(userAgent)) {
        browser = 'Firefox';
        const match = userAgent.match(/Firefox\/(\S+)/);
        version = match ? match[1] : 'Unknown';
    }

    return { browser, version, os, userAgent };
};