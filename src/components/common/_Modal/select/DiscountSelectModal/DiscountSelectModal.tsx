import { useDealUpload } from '@/hooks/useDealUpload';
import styles from './DiscountSelectModal.module.css';
import { useState } from 'react';
import { mockDiscounts } from '@/mocks/mockDiscounts';
import ModalSearchInput from '@/components/common/_Input/ModalSearchInput';
import CheckIcon from '@/assets/icons/check-Icon.svg';
import UnCheckIcon from '@/assets/icons/un-check-Icon.svg';
import TextGuideStore from '../TextGuideStore';
import ContainerFooterSelect from '../ContainerFooterSelect';

interface DiscountSelectModalProps {
    onClose: () => void;
}

export default function DiscountSelectModal({ onClose }: DiscountSelectModalProps) {
    const { setDiscounts } = useDealUpload(); // ✅ jotai 저장용 커스텀 훅
    const [query, setQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selected, setSelected] = useState<{ id: number; name: string }[]>([]);

    const filtered = mockDiscounts.filter(d => d.name.includes(query));

    const handleChange = (value: string) => {
        setQuery(value);
        setInputValue(value);
    };

    const handleDirectInput = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        if (!selected.find(d => d.name === trimmed)) {
            setSelected(prev => [...prev, { id: 0, name: trimmed }]); // id 0은 사용자 정의
        }
        setInputValue('');
        setQuery('');
    };

    const toggleDiscount = (item: { id: number; name: string }) => {
        setSelected(prev =>
            prev.find(d => d.name === item.name) ? prev.filter(d => d.name !== item.name) : [...prev, item],
        );
    };

    const handleReset = () => setSelected([]);

    const handleClickConfirm = () => {
        if (selected.length > 0) {
            const ids = selected.map(d => d.id);
            const names = selected.map(d => d.name);
            setDiscounts(ids, names); // ✅ jotai에 저장
            onClose();
        }
    };

    return (
        <>
            <div className={styles.containerDiscountSelected}>
                {selected.length === 0 && '할인방식을 추가해주세요.'}
                {selected.map(item => (
                    <div className={styles.tagSelected} key={item.name}>
                        {item.name}
                        <button className={styles.buttonRemoveTag} onClick={() => toggleDiscount(item)}>
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <div>
                <div className={styles.selectContainerSearch}>
                    <ModalSearchInput
                        placeholder="할인방식 검색"
                        value={inputValue}
                        onChange={handleChange}
                        onConfirm={handleDirectInput}
                        directInputLabel="직접 추가"
                    />
                </div>

                <ul className={styles.listDiscountSelect}>
                    {filtered.length > 0 ? (
                        filtered.map(discount => (
                            <li
                                className={styles.itemDiscountSelect}
                                key={discount.id}
                                onClick={() => toggleDiscount(discount)}
                            >
                                <span
                                    className={`${styles.labelDiscount} ${selected.some(d => d.name === discount.name) && styles.selected}`}
                                >
                                    {discount.name}
                                </span>
                                <img
                                    src={selected.some(d => d.name === discount.name) ? CheckIcon : UnCheckIcon}
                                    alt="체크"
                                />
                            </li>
                        ))
                    ) : (
                        <TextGuideStore>
                            검색되지 않는 할인방식인 경우 <br />
                            직접 추가 버튼을 클릭해주세요
                        </TextGuideStore>
                    )}
                </ul>
            </div>

            <ContainerFooterSelect>
                <button className={styles.buttonResetDiscount} onClick={handleReset}>
                    초기화
                </button>
                <button
                    className={`${styles.buttonConfirmDiscount} ${selected.length > 0 && styles.active}`}
                    onClick={handleClickConfirm}
                >
                    선택
                </button>
            </ContainerFooterSelect>
        </>
    );
}
