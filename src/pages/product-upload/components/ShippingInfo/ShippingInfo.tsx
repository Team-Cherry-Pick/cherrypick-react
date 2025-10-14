import styles from './ShippingInfo.module.css';
import { useAtom } from 'jotai';
import { newDealAtom } from '@/store';
import { BadgeLabel } from '@/components/common/Badge';

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

    const handleBadgeClick = (label: ShippingBadgeLabel) => {
        const clickedType = shippingBadgeMap[label];
        
        setDeal({
            ...deal,
            shippingType: clickedType,
        });
    };

    return (
        <div className={styles.inputContainer}>
            <div className={styles.badgeContainer}>
                {SHIPPING_BADGES.map(label => (
                    <BadgeLabel
                        key={label}
                        label={label}
                        selected={deal.shippingType === shippingBadgeMap[label as ShippingBadgeLabel]}
                        onClick={() => handleBadgeClick(label as ShippingBadgeLabel)}
                    />
                ))}
            </div>
        </div>
    );
}
