import { SelectTrigger, TextArea } from '@/components/common/Input';
import styles from './DiscountInfo.module.css';
import { DiscountSelectModal } from '@/components/common/Modal';
import { overlay } from '@/context/overlay';
import { newDealAtom } from '@/store';
import { useAtom } from 'jotai';

export function DiscountInfo() {
    const [deal, setDeal] = useAtom(newDealAtom);

    return (
        <div className={styles.inputContainer}>
            <SelectTrigger
                label={
                    deal.discountNames.length > 0
                        ? deal.discountNames.map(discountName => `#${discountName}`).join(' ')
                        : '할인방식 선택'
                }
                onClick={() => {
                    overlay.open(DiscountSelectModal);
                }}
            />
            <div className={styles.textAreaWrapper}>
                <TextArea
                    placeholder="최저가로 구매하기 위한 방법을 작성해주세요."
                    onChange={e => setDeal({ ...deal, discountDescription: e.target.value })}
                />
                <div className={styles.contentLength}>{deal.discountDescription.length} / 800</div>
            </div>
        </div>
    );
}
