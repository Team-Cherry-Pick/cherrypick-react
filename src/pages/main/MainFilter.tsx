import { useState } from 'react';
import { CategoryList } from '@/components/common/Select/CategoryList';
import { useAtomValue } from 'jotai';
import { categoryTreeAtom } from '@/store/category';
import { useFilter } from '@/hooks/useFilter';
import { FaCheck } from 'react-icons/fa';
import { IoIosCheckmarkCircleOutline, IoIosCheckmarkCircle } from 'react-icons/io';
import * as S from './MainFilter.style';

const MainFilter = () => {
    const { filter, toggleFilter, resetFilter } = useFilter();
    const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
    const categoryTree = useAtomValue(categoryTreeAtom);
    const [priceChecked, setChecked] = useState(false);
    const [currency, setCurrency] = useState<'₩' | '$'>('₩');

    let current = categoryTree;
    for (const step of selectedSteps) {
        const found = current.find(c => c.name === step);
        current = found?.subCategories ?? [];
    }

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
            {categoryTree ? (
                <S.CategoryGrid>
                    {/* 실제 카테고리 리스트 혹은 CategoryList 컴포넌트 */}
                    <S.CategoryItem>카테고리 데이터 표시 예정</S.CategoryItem>
                </S.CategoryGrid>
            ) : (
                <S.CategoryGrid>
                    <S.CategoryItem style={{ opacity: 0.5 }}>
                        카테고리 데이터를 불러오는 중입니다...
                    </S.CategoryItem>
                </S.CategoryGrid>
            )}
            {/*
            <S.CategoryPathWrapper>
                <div>
                    <strong>현재</strong>
                    <span> | </span>
                    {selectedSteps.map((step, idx) => (
                        <span key={idx} style={{ color: 'tomato', fontWeight: idx === selectedSteps.length - 1 ? 'bold' : 'normal' }}>
                            {step}
                            {idx < selectedSteps.length - 1 && ' > '}
                        </span>
                    ))}
                </div>
                {selectedSteps.length > 0 && (
                    <button type="button" onClick={() => setSelectedSteps(prev => prev.slice(0, -1))}>
                        <u style={{ color: 'gray' }}>상위 카테고리 이동</u>
                    </button>
                )}
            </S.CategoryPathWrapper>

            <CategoryList
                selectedSteps={selectedSteps}
                onSelect={setSelectedSteps}
            /> */}
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
