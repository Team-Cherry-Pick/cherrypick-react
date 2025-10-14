import { TextArea } from '@/components/common/Input';
import styles from './ProductDetail.module.css';
import { newDealAtom } from '@/store';
import { useAtom } from 'jotai';

export function ProductDetail() {
    const [deal, setDeal] = useAtom(newDealAtom);

    return (
        <div className={styles.textAreaWrapper}>
            <TextArea
                placeholder="핫딜 상품에 대한 간단한 설명을 작성해주세요."
                value={deal.content}
                onChange={e => setDeal({ ...deal, content: e.target.value })}
            />
            <div className={styles.contentLength}>{deal.content.length} / 800</div>
        </div>
    );
}
