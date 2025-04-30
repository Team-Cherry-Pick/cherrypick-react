import { useState } from 'react';
import { SelectInput } from '@/components/common/Input/ModalSearchInput';
import { mockDiscounts } from '@/mocks/mockDiscounts';
import * as S from './select.style';
import CheckIcon from '@/assets/icons/check-Icon.svg';
import UnCheckIcon from '@/assets/icons/un-check-Icon.svg';
import { useDealUpload } from '@/hooks/useDealUpload'; // jotai 저장용

interface Props {
    onClose: () => void;
}

export function DiscountSelectModal({ onClose }: Props) {
    const { setDiscounts } = useDealUpload(); // ✅ jotai 저장용 커스텀 훅
    const [query, setQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selected, setSelected] = useState<{ id: number; name: string }[]>([]);

    const filtered = mockDiscounts.filter((d) =>
        d.name.includes(query)
    );

    const handleChange = (value: string) => {
        setQuery(value);
        setInputValue(value);
    };

    const handleDirectInput = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        if (!selected.find((d) => d.name === trimmed)) {
            setSelected((prev) => [...prev, { id: 0, name: trimmed }]); // id 0은 사용자 정의
        }
        setInputValue('');
        setQuery('');
    };

    const toggleDiscount = (item: { id: number; name: string }) => {
        setSelected((prev) =>
            prev.find((d) => d.name === item.name)
                ? prev.filter((d) => d.name !== item.name)
                : [...prev, item]
        );
    };

    const handleReset = () => setSelected([]);

    const handleClickConfirm = () => {
        if (selected.length > 0) {
            const ids = selected.map((d) => d.id);
            const names = selected.map((d) => d.name);
            setDiscounts(ids, names); // ✅ jotai에 저장
            onClose();
        }
    };

    return (
        <>
            <S.containerDiscountSelected>
                {selected.map((item) => (
                    <S.tagSelected key={item.name}>
                        {item.name}
                        <S.buttonRemoveTag onClick={() => toggleDiscount(item)}>✕</S.buttonRemoveTag>
                    </S.tagSelected>
                ))}
            </S.containerDiscountSelected>

            <S.selectWrapper>
                <S.selectContainerSearch>
                    <SelectInput
                        placeholder="할인방식 검색"
                        value={inputValue}
                        onChange={handleChange}
                        onConfirm={handleDirectInput}
                        directInputLabel="직접 추가"
                    />
                </S.selectContainerSearch>

                <S.listDiscountSelect>
                    {filtered.length > 0 ? (
                        filtered.map((discount) => (
                            <S.ItemDiscountSelect
                                key={discount.id}
                                onClick={() => toggleDiscount(discount)}
                                selected={selected.some((d) => d.name === discount.name)}
                            >
                                <S.labelDiscount selected={selected.some((d) => d.name === discount.name)}>
                                    {discount.name}
                                </S.labelDiscount>
                                <img
                                    src={
                                        selected.some((d) => d.name === discount.name)
                                            ? CheckIcon
                                            : UnCheckIcon
                                    }
                                    alt="체크"
                                />
                            </S.ItemDiscountSelect>
                        ))
                    ) : (
                        <S.textGuideStore>
                            검색되지 않는 할인방식인 경우 <br />
                            직접 추가 버튼을 클릭해주세요
                        </S.textGuideStore>
                    )}
                </S.listDiscountSelect>
            </S.selectWrapper>

            <S.containerFooter>
                <S.buttonResetDiscount onClick={handleReset}>초기화</S.buttonResetDiscount>
                <S.buttonConfirmDiscount
                    active={selected.length > 0}
                    onClick={handleClickConfirm}
                >
                    선택
                </S.buttonConfirmDiscount>
            </S.containerFooter>
        </>
    );
}
