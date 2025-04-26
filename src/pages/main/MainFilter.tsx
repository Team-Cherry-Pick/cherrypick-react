import { useState } from 'react';
import { useFilter } from '@/hooks/useFilter';
import { FaCheck } from 'react-icons/fa';
import { IoIosCheckmarkCircleOutline, IoIosCheckmarkCircle } from 'react-icons/io';
import * as S from './MainFilter.style';

const MainFilter = () => {
    const { filter, toggleFilter, resetFilter } = useFilter();
    const [priceChecked, setChecked] = useState(false);

    const [currency, setCurrency] = useState<'₩' | '$'>('₩');
    const toggleCurrency = () => {
        setCurrency((prev) => (prev === '₩' ? '$' : '₩'));
    };

    const togglePrice = () => setChecked((prev) => !prev);

    return (
        <S.FilterWrapper>
            <S.HeaderRow>
                <S.SectionTitle>필터</S.SectionTitle>
                <S.ResetText onClick={resetFilter}>전체 초기화</S.ResetText>
            </S.HeaderRow>

            <S.CheckboxGroup>
                <S.CheckboxLabel>
                    <S.HiddenCheckbox
                        type="checkbox"
                        checked={filter.soldOut}
                        onChange={() => toggleFilter('soldOut')}
                    />
                    <S.Box checked={filter.soldOut}>
                        {filter.soldOut && <FaCheck />}
                    </S.Box>
                    <span>품절 포함</span>
                </S.CheckboxLabel>

                <S.CheckboxLabel>
                    <S.HiddenCheckbox
                        type="checkbox"
                        checked={filter.freeShipping}
                        onChange={() => toggleFilter('freeShipping')}
                    />
                    <S.Box checked={filter.freeShipping}>
                        {filter.freeShipping && <FaCheck />}
                    </S.Box>
                    <span>무료배송</span>
                </S.CheckboxLabel>

                <S.CheckboxLabel>
                    <S.HiddenCheckbox
                        type="checkbox"
                        checked={filter.overseas}
                        onChange={() => toggleFilter('overseas')}
                    />
                    <S.Box checked={filter.overseas}>
                        {filter.overseas && <FaCheck />}
                    </S.Box>
                    <span>해외직구</span>
                </S.CheckboxLabel>
            </S.CheckboxGroup>

            <S.Divider />

            {/* 카테고리 */}
            <S.SectionTitle>카테고리</S.SectionTitle>
            <S.CategoryHead>
                <S.CategoryFilter type="button" $active={false}>현재</S.CategoryFilter>
                <span>|</span>
                <S.CategoryFilter type="button" $active={true}>전체</S.CategoryFilter>
            </S.CategoryHead>
            <S.CategoryGrid>
                <S.CategoryItem>식품</S.CategoryItem>
                <S.CategoryItem>출산/유아동</S.CategoryItem>
                <S.CategoryItem>주방용품</S.CategoryItem>
                <S.CategoryItem>생활용품</S.CategoryItem>
                <S.CategoryItem>홈인테리어</S.CategoryItem>
                <S.CategoryItem>가전/디지털</S.CategoryItem>
                <S.CategoryItem>패션의류/잡화</S.CategoryItem>
                <S.CategoryItem>스포츠/레저</S.CategoryItem>
                <S.CategoryItem>자동차용품</S.CategoryItem>
                <S.CategoryItem>완구/취미</S.CategoryItem>
                <S.CategoryItem>반려동물용품</S.CategoryItem>
                <S.CategoryItem>헬스/건강식품</S.CategoryItem>
                <S.CategoryItem>여행/티켓</S.CategoryItem>
                <S.CategoryItem>문구/오피스</S.CategoryItem>
                <S.CategoryItem>기타</S.CategoryItem>
            </S.CategoryGrid>

            <S.Divider />

            {/* 가격 */}
            <S.SectionTitle>가격</S.SectionTitle>
            <S.PriceContainer>
                <S.PriceInputWrapper>
                    <S.PriceInput />
                    <span>~</span>
                    <S.PriceInput />
                    <S.ApplyButton onClick={toggleCurrency}>{currency}</S.ApplyButton>
                </S.PriceInputWrapper>
            </S.PriceContainer>
            <S.LabelRow>
                <S.CheckboxWrapper onClick={togglePrice}>
                    {priceChecked ? (
                        <IoIosCheckmarkCircle size={20} />
                    ) : (
                        <IoIosCheckmarkCircleOutline size={20} />
                    )}
                    <span>다양한 가격상품 포함</span>
                </S.CheckboxWrapper>
            </S.LabelRow>

            <S.Divider />

            {/* 스토어 */}
            <S.SectionTitle>스토어</S.SectionTitle>
            <S.AddButton>
                <span>추가 +</span>
            </S.AddButton>

            {/* 할인방식 */}
            <S.SectionTitle>할인방식</S.SectionTitle>
            <S.AddButton>
                <span>추가 +</span>
            </S.AddButton>
        </S.FilterWrapper>
    );
};

export default MainFilter;
