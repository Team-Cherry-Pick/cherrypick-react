import styles from './ShippingInfo.module.css';
import { useAtom } from 'jotai';
import { newDealAtom } from '@/store';
import { useState } from 'react';
import { BadgeLabel } from '@/components/common/Badge';
import { TextInput } from '@/components/common/Input';

const SHIPPING_BADGES = ['무료배송', '조건 무료배송', '유료 배송', '$'];
const shippingBadgeMap = {
    무료배송: 'FREE',
    '조건 무료배송': 'CONDITIONAL',
    '유료 배송': 'KRW',
    $: 'USD',
} as const;

type ShippingBadgeLabel = keyof typeof shippingBadgeMap;

export function ShippingInfo() {
    const [deal, setDeal] = useAtom(newDealAtom);
    const [selectedType, setSelectedType] = useState<'무료배송' | '조건 무료배송' | '유료 배송' | '$'>('무료배송');

    const handleBadgeClick = (label: ShippingBadgeLabel) => {
        setSelectedType(label);
        const selectedType = shippingBadgeMap[label];

        setDeal({
            ...deal,
            shipping: {
                ...deal.shipping,
                shippingType: selectedType,
            },
        });
    };

    return (
        <div className={styles.inputContainer}>
            <div className={styles.badgeContainer}>
                {SHIPPING_BADGES.map(label => (
                    <BadgeLabel
                        key={label}
                        label={label}
                        selected={deal.shipping.shippingType === shippingBadgeMap[label as ShippingBadgeLabel]}
                        onClick={() => handleBadgeClick(label as ShippingBadgeLabel)}
                    />
                ))}
            </div>
            <div className={styles.textInputContainer}>
                <TextInput
                    placeholder="무료배송 조건"
                    value={deal.shipping.shippingRule}
                    onChange={e =>
                        setDeal({
                            ...deal,
                            shipping: {
                                ...deal.shipping,
                                shippingRule: e.target.value,
                            },
                        })
                    }
                    disabled={selectedType !== '조건 무료배송'}
                />
                <TextInput
                    placeholder="배송비"
                    value={deal.shipping.shippingPrice === 0 ? '' : deal.shipping.shippingPrice?.toString()}
                    onChange={e =>
                        setDeal({
                            ...deal,
                            shipping: {
                                ...deal.shipping,
                                shippingPrice: Number(e.target.value) || 0,
                            },
                        })
                    }
                    disabled={selectedType === '무료배송' || selectedType === '조건 무료배송'}
                />
            </div>
        </div>
    );
}
