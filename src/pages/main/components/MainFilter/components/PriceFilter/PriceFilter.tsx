import { formatNumber } from '@/utils/number';
import styles from './PriceFilter.module.css';
import { priceFilterAtom, triggerFetchAtom, updatePriceFilterAtom, variousPriceAtom } from '@/store/search';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { IoIosCheckmarkCircle, IoIosCheckmarkCircleOutline } from 'react-icons/io';

function parseNumber(str: string) {
    const num = Number(str.replace(/,/g, ''));
    return isNaN(num) ? undefined : num;
}

export function PriceFilter() {
    const [priceFilter] = useAtom(priceFilterAtom);
    const [variousPrice, setVariousPrice] = useAtom(variousPriceAtom);
    const updatePriceFilter = useSetAtom(updatePriceFilterAtom);
    const triggerFetch = useSetAtom(triggerFetchAtom);

    const [minInput, setMinInput] = useState(priceFilter.minPrice ? formatNumber(priceFilter.minPrice) : '');
    const [maxInput, setMaxInput] = useState(priceFilter.maxPrice ? formatNumber(priceFilter.maxPrice) : '');

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9]/g, '');
        setMinInput(raw ? formatNumber(Number(raw)) : '');
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9]/g, '');
        setMaxInput(raw ? formatNumber(Number(raw)) : '');
    };

    const handleApply = () => {
        const min = parseNumber(minInput.replace(/[^0-9]/g, ''));
        const max = parseNumber(maxInput.replace(/[^0-9]/g, ''));
        if (min !== undefined && max !== undefined && min > max) {
            alert('최소 가격은 최대 가격보다 클 수 없습니다.');
            return;
        }
        updatePriceFilter({
            minPrice: min,
            maxPrice: max,
        });
        triggerFetch();
    };

    // 필터 리셋될 때 input도 초기화
    useEffect(() => {
        setMinInput(formatNumber(priceFilter.minPrice));
        setMaxInput(formatNumber(priceFilter.maxPrice));
    }, [priceFilter]);

    return (
        <div>
            <div className={styles.flexBox}>
                <div className={styles.title}>가격</div>
                <button className={styles.applyButton} onClick={handleApply}>
                    적용하기
                </button>
            </div>
            <div className={styles.priceContainer}>
                <button
                    className={styles.priceType}
                    onClick={() => updatePriceFilter({ priceType: priceFilter.priceType === 'KRW' ? 'USD' : 'KRW' })}
                >
                    {priceFilter.priceType === 'KRW' ? '₩' : '$'}
                </button>
                <input
                    className={styles.priceInput}
                    type="text"
                    inputMode="numeric"
                    placeholder="최소 가격"
                    value={minInput}
                    onChange={handleMinChange}
                    maxLength={15}
                />
                <div className={styles.priceDivider} />
                <input
                    className={styles.priceInput}
                    type="text"
                    inputMode="numeric"
                    placeholder="최대 가격"
                    value={maxInput}
                    onChange={handleMaxChange}
                    maxLength={15}
                />
            </div>
            <button
                className={`${styles.variousPriceButton} ${variousPrice && styles.variousPriceButton_active}`}
                onClick={() => setVariousPrice(!variousPrice)}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {variousPrice ? <IoIosCheckmarkCircle size={20} /> : <IoIosCheckmarkCircleOutline size={20} />}
                </div>
                <span>다양한 가격상품 제외</span>
            </button>
        </div>
    );
}
