//import { useState } from 'react';
import * as S from '../select.style';
import LeftArrowIcon from '@/assets/icons/left-arrow-icon.svg';
import RightArrowIcon from '@/assets/icons/right-arrow-icon.svg';

interface CategoryStep1Props {
    onNext: (category: string) => void;
    onFinalSelect: (category: string[]) => void;
}

const CATEGORIES = [
    '식품', '주방용품', '홈인테리어', '패션의류/잡화', '자동차용품',
    '반려동물용품', '여행/티켓', '출산/유아동', '생활용품',
    '가전/디지털', '스포츠/레저', '완구/취미', '헬스/건강식품', '문구/오피스', '기타'
];

export function CategoryStep1({ onNext, onFinalSelect }: CategoryStep1Props) {
    return (
        <>
            <S.textSubheaderCategory>
                <img src={LeftArrowIcon} alt="이전" style={{ marginRight: '8px' }} /> 전체 카테고리
            </S.textSubheaderCategory>
            <S.listCategorySelect>
                {CATEGORIES.map(category => (
                    <S.itemCategorySelect
                        key={category}
                        onClick={() =>
                            category === '기타'
                                ? onFinalSelect([category])
                                : onNext(category)
                        }
                    >
                        {category}
                        {category !== '기타' && <img src={RightArrowIcon} alt="다음" />}
                    </S.itemCategorySelect>
                ))}
            </S.listCategorySelect>
        </>
    );
}
