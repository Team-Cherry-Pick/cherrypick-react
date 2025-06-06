import TextArea from '@/components/common/_Input/TextArea';
import styles from './ProductDetail.module.css';
import { newDealAtom } from '@/store';
import { useAtom } from 'jotai';

export default function ProductDetail() {
    const [deal, setDeal] = useAtom(newDealAtom);

    return (
        <div className={styles.textAreaWrapper}>
            <TextArea
                placeholder="핫딜 상품에 대한 자세한 설명을 작성해주세요.
업로드 금지 품목 및 바이럴 활동으로 판단될 시 게시물이
삭제되고 서비스 이용이 제한될 수 있습니다."
                value={deal.content}
                onChange={e => setDeal({ ...deal, content: e.target.value })}
            />
            <div className={styles.contentLength}>{deal.content.length} / 800</div>
        </div>
    );
}
