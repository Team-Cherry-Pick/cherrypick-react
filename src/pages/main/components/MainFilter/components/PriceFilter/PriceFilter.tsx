import { formatNumber } from '@/utils/number';
import styles from './PriceFilter.module.css';
import { priceFilterAtom, triggerFetchAtom, updatePriceFilterAtom, variousPriceAtom } from '@/store/search';
import { useAtom, useSetAtom } from 'jotai';
import { useState } from 'react';
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
        const min = parseNumber(raw);
        const max = priceFilter.maxPrice;

        // 최대값보다 크면 max도 같이 조정
        if (min !== undefined && max !== undefined && min > max) {
            updatePriceFilter({
                minPrice: min,
                maxPrice: min,
            });
            setMaxInput(formatNumber(min));
        } else {
            updatePriceFilter({
                minPrice: min,
            });
        }
        setMinInput(raw ? formatNumber(Number(raw)) : '');
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9]/g, '');
        const max = parseNumber(raw);
        const min = priceFilter.minPrice;

        // 최소값보다 작으면 min도 같이 조정
        if (max !== undefined && min !== undefined && max < min) {
            updatePriceFilter({
                minPrice: max,
                maxPrice: max,
            });
            setMinInput(formatNumber(max));
        } else {
            updatePriceFilter({
                maxPrice: max,
            });
        }
        setMaxInput(raw ? formatNumber(Number(raw)) : '');
    };

    return (
        <div>
            <div className={styles.flexBox}>
                <div className={styles.title}>가격</div>
                <button className={styles.applyButton} onClick={() => triggerFetch()}>
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
