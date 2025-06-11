import { SelectTrigger, TextInput } from '@/components/common/Input';
import styles from './ProductInfo.module.css';
import { CategorySelectModal } from '@/components/common/Modal';
import { overlay } from '@/context/overlay';
import { newDealAtom, selectedCategoryPathAtom } from '@/store';
import { useAtom } from 'jotai';

export default function ProductInfo() {
    const [deal, setDeal] = useAtom(newDealAtom);
    const [categoryPath] = useAtom(selectedCategoryPathAtom);

    return (
        <div className={styles.productInfoWrapper}>
            <TextInput
                placeholder="상품명 입력"
                value={deal.title}
                onChange={e => setDeal({ ...deal, title: e.target.value })}
            />
            <SelectTrigger
                label={categoryPath || '카테고리 선택'}
                onClick={() => {
                    overlay.open(CategorySelectModal);
                }}
            />
        </div>
    );
}
