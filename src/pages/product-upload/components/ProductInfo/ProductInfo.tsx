import styles from './ProductInfo.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { finalSelectedCategoryAtom } from '@/store/category';
import { SelectTrigger, TextInput } from '@/components/common/Input';
import { newDealAtom } from '@/store';
import { overlay } from '@/context/overlay';
import { CategorySelectModal } from '@/components/common/Modal';

export function ProductInfo() {
    const [deal, setDeal] = useAtom(newDealAtom);
    const finalSelectedCategory = useAtomValue(finalSelectedCategoryAtom);

    const categoryLabel = finalSelectedCategory ? finalSelectedCategory.path.join(' > ') : '카테고리 선택';

    return (
        <div className={styles.productInfoWrapper}>
            <TextInput
                placeholder="상품명 입력"
                value={deal.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeal({ ...deal, title: e.target.value })}
            />
            <SelectTrigger
                label={categoryLabel}
                onClick={() => {
                    overlay.open(CategorySelectModal);
                }}
            />
        </div>
    );
}
