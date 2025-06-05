import styles from './ProductInfo.module.css';
import SelectTrigger from '@/components/common/_Input/SelectTrigger';
import TextInput from '@/components/common/_Input/TextInput';
import { newDealAtom, selectedCategoryPathAtom } from '@/store';
import { useAtom } from 'jotai';

interface ProductInfoProps {
    onOpenCategoryModal: () => void;
}

export default function ProductInfo({ onOpenCategoryModal }: ProductInfoProps) {
    const [deal, setDeal] = useAtom(newDealAtom);
    const [categoryPath] = useAtom(selectedCategoryPathAtom);

    return (
        <div className={styles.productInfoWrapper}>
            <TextInput
                placeholder="상품명 입력"
                value={deal.title}
                onChange={e => setDeal({ ...deal, title: e.target.value })}
            />
            <SelectTrigger label={categoryPath || '카테고리 선택'} onClick={onOpenCategoryModal} />
        </div>
    );
}
