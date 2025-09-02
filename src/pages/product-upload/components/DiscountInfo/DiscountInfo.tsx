import { SelectTrigger } from '@/components/common/Input';
import styles from './DiscountInfo.module.css';
import { DiscountSelectModal } from '@/components/common/Modal';
import { overlay } from '@/context/overlay';
import { newDealAtom } from '@/store';
import { useAtom } from 'jotai';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';

export function DiscountInfo() {
    const [deal, setDeal] = useAtom(newDealAtom);
    const isMobile = useIsMobileViewport();

    // TODO: 수정 후 제거 필요
    const handleDiscountSelect = () => {
        if (isMobile) {
            alert('준비 중입니다');
            return;
        }
        
        overlay.open(DiscountSelectModal);
    };

    return (
        <div className={styles.inputContainer}>
            <SelectTrigger
                label={
                    deal.discountNames.length > 0
                        ? deal.discountNames.map(discountName => `#${discountName}`).join(' ')
                        : '할인방식 선택'
                }
                onClick={handleDiscountSelect}
            />
        </div>
    );
}
