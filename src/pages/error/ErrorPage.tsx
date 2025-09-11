// pages/ErrorPage.tsx
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { GA4Events } from '@/utils/ga4';

const getMessageByCode = (code: string) => {
    const codeNum = Number(code);
    if (isNaN(codeNum)) return '잘못된 에러 코드입니다.';

    if (codeNum >= 500) return '서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.';
    if (codeNum === 401) return '인증이 만료되었어요. 다시 로그인해주세요.';
    if (codeNum === 403) return '접근 권한이 없습니다.';
    if (codeNum === 404) return '요청한 페이지를 찾을 수 없어요.';
    if (codeNum >= 400) return '잘못된 요청이에요. 입력을 확인해주세요.';
    return '알 수 없는 오류입니다.';
};

const ErrorPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const code = params.get('code') ?? '';

    useEffect(() => {
        GA4Events.exception(code, getMessageByCode(code));
    }, [code]);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>문제가 발생했어요 😢</h1>
            <p>{getMessageByCode(code)}</p>
        </div>
    );
};

export default ErrorPage;
