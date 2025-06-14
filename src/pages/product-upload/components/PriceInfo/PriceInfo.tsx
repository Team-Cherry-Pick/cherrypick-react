import styles from './PriceInfo.module.css';
import { useAtom } from 'jotai';
import { newDealAtom } from '@/store';
import { useState } from 'react';
import { BadgeLabel } from '@/components/common/Badge';
import { TextInput } from '@/components/common/Input';

const PRICE_BADGES = ['다양한 가격', '$'];
const priceBadgeMap = {
    '다양한 가격': 'VARIOUS',
    $: 'USD',
} as const;

type PriceBadgeLabel = keyof typeof priceBadgeMap;

export function PriceInfo() {
    const [deal, setDeal] = useAtom(newDealAtom);
    const [selectedType, setSelectedType] = useState<'다양한 가격' | '$' | null>(null);

    const handleBadgeClick = (label: PriceBadgeLabel) => {
        setSelectedType(prev => (prev === label ? null : label));
        const clickedType = priceBadgeMap[label];

        setDeal({
            ...deal,
            price: {
                ...deal.price,
                priceType: deal.price.priceType === clickedType ? 'KRW' : clickedType,
            },
        });
    };

    return (
        <div className={styles.inputContainer}>
            <div className={styles.badgeContainer}>
                {PRICE_BADGES.map(label => (
                    <BadgeLabel
                        key={label}
                        label={label}
                        selected={deal.price.priceType === priceBadgeMap[label as PriceBadgeLabel]}
                        onClick={() => handleBadgeClick(label as PriceBadgeLabel)}
                    />
                ))}
            </div>
            <div className={styles.textInputContainer}>
                <TextInput
                    placeholder="세일가"
                    value={deal.price.discountedPrice === 0 ? '' : deal.price.discountedPrice.toString()}
                    onChange={e =>
                        setDeal({
                            ...deal,
                            price: {
                                ...deal.price,
                                discountedPrice: Number(e.target.value) || 0,
                            },
                        })
                    }
                    disabled={selectedType === '다양한 가격'}
                />
                <TextInput
                    placeholder="정가"
                    value={deal.price.regularPrice === 0 ? '' : deal.price.regularPrice.toString()}
                    onChange={e =>
                        setDeal({
                            ...deal,
                            price: {
                                ...deal.price,
                                regularPrice: Number(e.target.value) || 0,
                            },
                        })
                    }
                    disabled={selectedType === '다양한 가격'}
                />
            </div>
        </div>
    );
}
