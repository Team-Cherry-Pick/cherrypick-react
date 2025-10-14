import { SelectTrigger } from '@/components/common/Input';
import styles from './DiscountInfo.module.css';
import { DiscountSelectModal } from '@/components/common/Modal';
import { overlay } from '@/context/overlay';
import { selectedDiscountAtom } from '@/store/search';
import { useAtomValue } from 'jotai';

export function DiscountInfo() {
    const selectedDiscount = useAtomValue(selectedDiscountAtom);

    const handleDiscountSelect = () => {
        overlay.open(DiscountSelectModal);
    };

    return (
        <div className={styles.inputContainer}>
            <SelectTrigger
                label={
                    selectedDiscount.length > 0
                        ? selectedDiscount.map(discount => `#${discount.name}`).join(' ')
                        : '할인방식 (선택)'
                }
                onClick={handleDiscountSelect}
            />
        </div>
    );
}
