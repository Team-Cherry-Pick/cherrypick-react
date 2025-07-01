import styles from './PriceInfo.module.css';
import { useAtom } from 'jotai';
import { newDealAtom } from '@/store';
import { useState } from 'react';
import { BadgeLabel } from '@/components/common/Badge';
import { TextInput } from '@/components/common/Input';
import { formatNumber } from '@/utils/number';

const PRICE_BADGES = ['다양한 가격', '$'];

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
                    regularPrice: 0,
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
                <TextInput
                    placeholder="세일가"
                    value={
                        deal.price.discountedPrice === 0
                            ? ''
                            : `${deal.price.priceType === 'KRW' ? `${formatNumber(deal.price.discountedPrice)} 원` : `$ ${formatNumber(deal.price.discountedPrice)}`}`
                    }
                    onChange={e => {
                        const raw = e.target.value.replace(/[^0-9]/g, '');
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
                />
                <TextInput
                    placeholder="정가"
                    value={
                        deal.price.regularPrice === 0
                            ? ''
                            : `${deal.price.priceType === 'KRW' ? `${formatNumber(deal.price.regularPrice)} 원` : `$ ${formatNumber(deal.price.regularPrice)}`}`
                    }
                    onChange={e => {
                        const raw = e.target.value.replace(/[^0-9]/g, '');
                        if (raw.length > 8) return;
                        setDeal({
                            ...deal,
                            price: {
                                ...deal.price,
                                regularPrice: Number(raw) || 0,
                            },
                        });
                    }}
                    disabled={selectedType === '다양한 가격'}
                />
            </div>
        </div>
    );
}
