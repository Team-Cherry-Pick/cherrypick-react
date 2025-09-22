import { atom } from 'jotai';

// localStorage에서 초기값 읽기
const getInitialValue = (): boolean => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('shouldApplyBetaTester') === 'true';
    }
    return false;
};

// 베타테스터 신청 의도를 관리하는 atom
export const shouldApplyBetaTesterAtom = atom<boolean>(getInitialValue());

// localStorage 연동을 위한 헬퍼 함수들
export const setBetaTesterIntent = (value: boolean): void => {
    if (typeof window !== 'undefined') {
        if (value) {
            localStorage.setItem('shouldApplyBetaTester', 'true');
        } else {
            localStorage.removeItem('shouldApplyBetaTester');
        }
    }
};

export const getBetaTesterIntent = (): boolean => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('shouldApplyBetaTester') === 'true';
    }
    return false;
};