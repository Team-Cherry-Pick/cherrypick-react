import styles from './DiscountInfo.module.css';
import SelectTrigger from '@/components/common/_Input/SelectTrigger';
import TextArea from '@/components/common/_Input/TextArea';
import { newDealAtom } from '@/store';
import { useAtom } from 'jotai';

interface DiscountInfoProps {
    onOpenDiscountModal: () => void;
}

export default function DiscountInfo({ onOpenDiscountModal }: DiscountInfoProps) {
    const [deal, setDeal] = useAtom(newDealAtom);

    return (
        <div className={styles.inputContainer}>
            <SelectTrigger label={'할인방식 선택'} onClick={onOpenDiscountModal} />
            <div className={styles.textAreaWrapper}>
                <TextArea
                    placeholder="최저가로 구매하기 위한 방법을 작성해주세요."
                    onChange={e => setDeal({ ...deal, discountDescription: e.target.value })}
                />
                <div className={styles.contentLength}>{deal.content.length} / 800</div>
            </div>
        </div>
    );
}
