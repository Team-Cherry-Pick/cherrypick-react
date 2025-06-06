import styles from './PriceInfo.module.css';
import { useAtom } from 'jotai';
import { newDealAtom } from '@/store';
import BadgeLabel from '@/components/common/_Badge/BadgeLabel';
import TextInput from '@/components/common/_Input/TextInput';
import { useState } from 'react';

const PRICE_BADGES = ['다양한 가격', '$'];
const priceBadgeMap = {
    '다양한 가격': 'KRW',
    $: 'USD',
} as const;

type PriceBadgeLabel = keyof typeof priceBadgeMap;

export default function PriceInfo() {
    const [deal, setDeal] = useAtom(newDealAtom);
    const [selectedType, setSelectedType] = useState<'다양한 가격' | '$' | null>(null);

    const handleBadgeClick = (label: PriceBadgeLabel) => {
        setSelectedType(label);
        const clickedType = priceBadgeMap[label];

        setDeal({
            ...deal,
            price: {
                ...deal.price,
                priceType: deal.price.priceType === clickedType ? null : clickedType,
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
