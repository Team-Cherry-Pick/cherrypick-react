import { useState } from 'react';
import { SelectInput } from '@/components/common/Input/SelectInput';
import * as S from './select.style';
import CheckIcon from '@/assets/icons/check-Icon.svg';
import UnCheckIcon from '@/assets/icons/un-check-Icon.svg';

const DISCOUNT_OPTIONS = [
    '이벤트 쿠폰', '최초가입쿠폰', '신한카드', '삼성카드', '국민카드',
    '현대카드', '롯데카드', '우리카드', '비씨카드', '하나카드',
    '포인트 적립', '상품권', '카카오페이 할인'
];

export function DiscountSelectModal() {
    const [query, setQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);

    const filtered = DISCOUNT_OPTIONS.filter(option => option.includes(query));

    const handleInputChange = (value: string) => {
        setQuery(value);
        setInputValue(value);
    };

    const handleDirectInput = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        if (!selectedDiscounts.includes(trimmed)) {
            setSelectedDiscounts(prev => [...prev, trimmed]);
        }
        setInputValue('');
        setQuery('');
    };

    const toggleDiscount = (discount: string) => {
        setSelectedDiscounts(prev =>
            prev.includes(discount)
                ? prev.filter(d => d !== discount)
                : [...prev, discount]
        );
    };

    const removeDiscount = (discount: string) => {
        setSelectedDiscounts(prev => prev.filter(d => d !== discount));
    };

    return (
        <>
            <S.containerDiscountSelected>
                {selectedDiscounts.map(item => (
                    <S.tagSelected key={item}>
                        {item}
                        <S.removeTagButton onClick={() => removeDiscount(item)}>✕</S.removeTagButton>
                    </S.tagSelected>
                ))}
            </S.containerDiscountSelected>

            <S.selectContainerWrapper>
                <S.containerSearchSelect>
                    <SelectInput
                        placeholder="할인방식 검색"
                        value={inputValue}
                        onChange={handleInputChange}
                        onConfirm={handleDirectInput}
                        directInputLabel="직접 추가"
                    />
                </S.containerSearchSelect>

                <S.listDiscountSelect>
                    {filtered.length > 0 ? (
                        filtered.map(discount => (
                            <S.ItemDiscountSelect
                                key={discount}
                                onClick={() => toggleDiscount(discount)}
                                selected={selectedDiscounts.includes(discount)}
                            >
                                {/* 라벨은 글씨체 바꾸기 위해 css 우선순위 설정 */}
                                <S.DiscountLabel selected={selectedDiscounts.includes(discount)}>
                                    {discount}
                                </S.DiscountLabel>
                                <img
                                    src={selectedDiscounts.includes(discount) ? CheckIcon : UnCheckIcon}
                                    alt={selectedDiscounts.includes(discount) ? '선택됨' : '미선택'}
                                />
                            </S.ItemDiscountSelect>
                        ))
                    ) : (
                        <S.textGuideStore>
                            검색되지 않는 할인방식인 경우 <br /> 작성 완료 후 직접 추가 버튼을 클릭해주세요
                        </S.textGuideStore>
                    )}
                </S.listDiscountSelect>
            </S.selectContainerWrapper>

        </>
    );
}
