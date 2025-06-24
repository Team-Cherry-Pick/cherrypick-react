import { overlay } from '@/context/overlay';
import styles from './DiscountFilter.module.css';
import { DiscountSelectModal } from '@/components/common/Modal';
import { PlusIcon } from 'lucide-react';
import { useAtom, useSetAtom } from 'jotai';
import { selectedDiscountAtom, triggerFetchAtom } from '@/store/search';
import CloseIcon from '@/assets/icons/close-Icon.svg';
import { useEffect } from 'react';

export function DiscountFilter() {
    const [selectedDiscount, setSelectedDiscount] = useAtom(selectedDiscountAtom);
    const triggerFetch = useSetAtom(triggerFetchAtom);

    const handleResetDiscount = () => {
        setSelectedDiscount([]);
    };

    const handleRemoveDiscount = (discountId: number) => {
        setSelectedDiscount(prev => prev.filter(discount => discount.discountId !== discountId));
    };

    useEffect(() => {
        triggerFetch();
    }, [selectedDiscount.length, triggerFetch]);

    return (
        <div>
            <div className={styles.flexBox}>
                <div className={styles.title}>할인방식</div>
                {selectedDiscount.length > 0 && (
                    <button className={styles.resetButton} onClick={handleResetDiscount}>
                        초기화
                    </button>
                )}
            </div>
            <div className={styles.discountContainer}>
                <button
                    className={styles.addButton}
                    onClick={() => {
                        overlay.open(props => {
                            return <DiscountSelectModal {...props} />;
                        });
                    }}
                >
                    <span>추가</span>
                    <PlusIcon width={14} />
                </button>
                {selectedDiscount.map(discount => (
                    <div key={discount.discountId} className={styles.discountBadge}>
                        {discount.name}
                        <button
                            className={styles.closeButton}
                            onClick={() => handleRemoveDiscount(discount.discountId)}
                        >
                            <img src={CloseIcon} alt="삭제" width={12} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
