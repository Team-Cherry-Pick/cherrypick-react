import styles from './DiscountSelectModal.module.css';
import CloseIcon from '@/assets/icons/close-Icon.svg?react';
import { useDealUpload } from '@/hooks/useDealUpload';
import { Suspense, useState } from 'react';
import TextGuideStore from '../components/TextGuideStore';
import ModalSearchInput from '../components/ModalSearchInput';
import CheckIcon from '@/assets/icons/check-Icon.svg?react';
import UnCheckIcon from '@/assets/icons/un-check-Icon.svg?react';
import ModalLayout from '../components/ModalLayout';
import { useAtom } from 'jotai';
import { useDiscountsQuery } from '@/store/discount';
import { selectedDiscountAtom } from '@/store/search';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';

interface DiscountSelectModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

function DiscountList({
    query,
    selected,
    toggleDiscount,
}: {
    query: string;
    selected: { id: number; name: string }[];
    toggleDiscount: (discount: { id: number; name: string }) => void;
}) {
    const { data: discounts = [], isLoading, error } = useDiscountsQuery();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div style={{ color: 'var(--color-error)', padding: '1rem', textAlign: 'center' }}>
                할인방식 목록을 불러오는데 실패했습니다.
            </div>
        );
    }

    const filtered = discounts.filter(discount => discount.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <>
            {filtered.length > 0 ? (
                filtered.map(discount => (
                    <li
                        className={styles.itemDiscountSelect}
                        key={discount.discountId}
                        onClick={() => toggleDiscount({ id: discount.discountId, name: discount.name })}
                    >
                        <span
                            className={`${styles.labelDiscount} ${selected.some(d => d.name === discount.name) && styles.selected}`}
                        >
                            {discount.name}
                        </span>
                        {selected.some(d => d.name === discount.name) ? <CheckIcon /> : <UnCheckIcon />}
                    </li>
                ))
            ) : (
                <TextGuideStore>
                    검색되지 않는 할인방식인 경우 <br />
                    직접 추가 버튼을 클릭해주세요
                </TextGuideStore>
            )}
        </>
    );
}

export function DiscountSelectModal({ isOpen, close, unmount }: DiscountSelectModalProps) {
    const { setDiscounts } = useDealUpload();
    const [query, setQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedDiscount, setSelectedDiscount] = useAtom(selectedDiscountAtom);
    const [selected, setSelected] = useState<{ id: number; name: string }[]>(
        selectedDiscount.map(d => {
            return { id: d.discountId, name: d.name };
        }),
    );

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
            setDiscounts(ids, names);
            setSelectedDiscount(selected.map(discount => ({ discountId: discount.id, name: discount.name })));
            close();
        }
    };

    return (
        <ModalLayout isOpen={isOpen} onExit={unmount}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>할인방식 선택</h2>
                    <button className={styles.closeButton} onClick={close}>
                        <CloseIcon />
                    </button>
                </div>
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
                        <Suspense fallback={<div>할인방식 목록을 불러오는 중...</div>}>
                            <DiscountList query={query} selected={selected} toggleDiscount={toggleDiscount} />
                        </Suspense>
                    </ul>
                </div>
                <div className={styles.footer}>
                    <button className={styles.buttonResetDiscount} onClick={handleReset}>
                        초기화
                    </button>
                    <button
                        className={`${styles.buttonConfirmDiscount} ${selected.length > 0 && styles.active}`}
                        onClick={handleClickConfirm}
                    >
                        선택
                    </button>
                </div>
            </div>
        </ModalLayout>
    );
}
