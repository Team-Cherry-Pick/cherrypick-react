import { useState } from 'react';
import { useTheme } from 'styled-components';
import { CategoryList } from '@/components/common/Select/CategoryList';
import { useAtomValue } from 'jotai';
import { categoryTreeAtom } from '@/store/category';
import { useFilter } from '@/hooks/useFilter';
import { useCategories } from '@/hooks/useCategories';
import { FaCheck } from 'react-icons/fa';
import { IoIosCheckmarkCircleOutline, IoIosCheckmarkCircle } from 'react-icons/io';
import * as S from './MainFilter.style';

const MainFilter = () => {
    useCategories();
    const theme = useTheme();
    const { filter, toggleFilter, resetFilter } = useFilter();

    const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
    const categoryTree = useAtomValue(categoryTreeAtom);
    const resetCategory = () => setSelectedSteps([]);

    const [priceChecked, setChecked] = useState(false);
    const [currency, setCurrency] = useState<'₩' | '$'>('₩');

    let current = categoryTree?.categories ?? [];
    for (const step of selectedSteps) {
        const found = current.find(c => c.name === step);
        if (!found) {
            current = [];
            break;
        }
        current = found.subCategories ?? [];
    }

    const toggleCurrency = () => {
        setCurrency((prev) => (prev === '₩' ? '$' : '₩'));
    };
    const togglePrice = () => setChecked((prev) => !prev);

    return (
        <S.FilterWrapper>
            <S.HeaderRow>
                <S.SectionTitle>필터</S.SectionTitle>
                <S.ResetText onClick={resetFilter}>초기화</S.ResetText>
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
            <S.HeaderRow>
                <S.SectionTitle>카테고리</S.SectionTitle>
                <S.ResetText onClick={resetCategory}>초기화</S.ResetText>
            </S.HeaderRow>
            <S.CategoryPathWrapper>
                <div>
                    <span>현재 | </span>
                    {selectedSteps.length === 0 ? (
                        <strong>전체</strong>
                    ) : (
                        selectedSteps.map((step, idx) => {
                            const isLast = idx === selectedSteps.length - 1;

                            return (
                                <span
                                    key={idx}
                                    onClick={() => {
                                        if (!isLast) {
                                            setSelectedSteps(selectedSteps.slice(0, idx + 1));
                                        }
                                    }}
                                    style={{
                                        display: 'inline',
                                        color: isLast ? theme.colors.primary : theme.colors.content.sub,
                                        fontWeight: isLast ? 'bold' : 'normal',
                                        cursor: isLast ? 'default' : 'pointer',
                                        wordBreak: 'keep-all', // 단어 중간에서 줄바꿈 방지
                                        whiteSpace: 'normal',
                                    }}
                                >
                                    {step}
                                    {!isLast && <span style={{ color: theme.colors.content.sub }}>{' > '}</span>}
                                </span>
                            );
                        })
                    )}
                </div>

                {selectedSteps.length === 1 && (
                    <button
                        type="button"
                        onClick={() => setSelectedSteps([])} // 전체로 이동
                    >
                        <u style={{ color: 'gray' }}>상위 카테고리 이동</u>
                    </button>
                )}
            </S.CategoryPathWrapper>

            {/* 카테고리 목록만 grid로 */}
            <S.CategoryListWrapper>
                <CategoryList
                    selectedSteps={selectedSteps}
                    onSelect={setSelectedSteps}
                />
            </S.CategoryListWrapper>
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
