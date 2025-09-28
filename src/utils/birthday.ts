/**
 * 생년월일 관리 유틸리티
 */
import React from 'react';

export interface BirthdayValidation {
    isValid: boolean;
    errorMessage: string;
    formattedDate: string;
}

/**
 * 유효한 날짜인지 검사
 */
const isValidDate = (year: number, month: number, day: number): boolean => {
    // 기본 범위 체크
    if (year < 1900 || year > new Date().getFullYear()) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    // 월별 일수 체크
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) return false;

    // 미래 날짜 체크
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // 오늘 끝까지 허용
    
    return inputDate <= today;
};

/**
 * 생년월일 입력 포맷팅 (YYYY-MM-DD 형식으로 자동 변환)
 */
export const formatBirthdayInput = (value: string): string => {
    // 숫자만 추출
    const numbers = value.replace(/\D/g, '');
    
    // 자동으로 하이픈 추가 (YYYY-MM-DD 형식)
    if (numbers.length <= 4) {
        return numbers;
    } else if (numbers.length <= 6) {
        return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    } else {
        return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 8)}`;
    }
};

/**
 * 생년월일 유효성 검사
 */
export const validateBirthday = (input: string): BirthdayValidation => {
    if (!input.trim()) {
        return { isValid: false, errorMessage: '', formattedDate: '' };
    }

    const numbers = input.replace(/\D/g, '');
    
    if (numbers.length !== 8) {
        return { isValid: false, errorMessage: '생년월일을 8자리로 입력해주세요 (예: 19900101)', formattedDate: '' };
    }

    const year = parseInt(numbers.slice(0, 4));
    const month = parseInt(numbers.slice(4, 6));
    const day = parseInt(numbers.slice(6, 8));

    if (!isValidDate(year, month, day)) {
        return { isValid: false, errorMessage: '올바른 날짜를 입력해주세요', formattedDate: '' };
    }

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return { isValid: true, errorMessage: '', formattedDate };
};

/**
 * YYYY-MM-DD 형식의 날짜를 사용자 입력 형식으로 변환
 */
export const convertDateToInput = (dateString: string): string => {
    if (!dateString) return '';
    const formatted = dateString.replace(/-/g, '');
    return formatBirthdayInput(formatted);
};

/**
 * 생년월일 입력 훅
 */
export const useBirthdayInput = (initialValue: string = '') => {
    const [input, setInput] = React.useState('');
    const [error, setError] = React.useState('');

    // 초기값 설정
    React.useEffect(() => {
        if (initialValue) {
            setInput(convertDateToInput(initialValue));
        }
    }, [initialValue]);

    const handleChange = (value: string): BirthdayValidation => {
        const formatted = formatBirthdayInput(value);
        setInput(formatted);

        const validation = validateBirthday(formatted);
        setError(validation.errorMessage);

        return validation;
    };

    return {
        input,
        error,
        handleChange,
        setInput,
        setError
    };
};