import styles from './PriceInfo.module.css';
import { useAtom } from 'jotai';
import { newDealAtom } from '@/store';
import { useState } from 'react';
import { BadgeLabel } from '@/components/common/Badge';
import { TextInput } from '@/components/common/Input';
import { formatNumber } from '@/utils/number';

const PRICE_BADGES = ['다양한 가격', '$'];

const SHIPPING_OPTIONS = [
    { label: '무료배송', value: 'FREE' },
    { label: '조건 무료배송', value: 'CONDITIONAL' },
    { label: '유료 배송', value: 'KRW' },
    { label: '$', value: 'USD' },
];

export function PriceInfo() {
    const [deal, setDeal] = useAtom(newDealAtom);
    const [selectedType, setSelectedType] = useState<'다양한 가격' | '$' | null>(null);

    const handleBadgeClick = (label: '다양한 가격' | '$') => {
        const next = label === selectedType ? null : label;
        setSelectedType(prev => (prev === label ? null : label));

        if (next === '다양한 가격') {
            setDeal({
                ...deal,
                price: {
                    priceType: 'VARIOUS',
                    discountedPrice: 0,
                },
            });
        } else {
            setDeal({
                ...deal,
                price: {
                    ...deal.price,
                    priceType: next ? 'USD' : 'KRW',
                },
            });
        }
    };

    const handleShippingSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDeal({
            ...deal,
            shippingType: e.target.value as 'FREE' | 'CONDITIONAL' | 'KRW' | 'USD',
        });
    };

    return (
        <div className={styles.inputContainer}>
            <div className={styles.badgeContainer}>
                {PRICE_BADGES.map(label => (
                    <BadgeLabel
                        key={label}
                        label={label}
                        selected={label === selectedType}
                        onClick={() => handleBadgeClick(label as '다양한 가격' | '$')}
                    />
                ))}
            </div>
            <div className={styles.textInputContainer}>
                <div className={styles.textInputWithUnit}>
                    <TextInput
                        placeholder="세일가"
                        value={deal.price.discountedPrice === 0 ? '' : formatNumber(deal.price.discountedPrice)}
                        onChange={e => {
                            const raw = e.target.value.replace(/[^0-9.]/g, '');
                            if (raw.length > 8) return;
                            setDeal({
                                ...deal,
                                price: {
                                    ...deal.price,
                                    discountedPrice: Number(raw) || 0,
                                },
                            });
                        }}
                        disabled={selectedType === '다양한 가격'}
                        style={{ paddingRight: '2.5rem' }}
                    />
                    {deal.price.discountedPrice !== 0 &&
                        (deal.price.priceType === 'KRW' ? (
                            <span className={styles.unitInside}>원</span>
                        ) : deal.price.priceType === 'USD' ? (
                            <span className={styles.unitInside}>$</span>
                        ) : null)}
                </div>
                <select
                    className={styles.shippingSelect}
                    value={deal.shippingType || ''}
                    onChange={handleShippingSelect}
                >
                    <option value="" disabled>배송방법 선택</option>
                    {SHIPPING_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
