import styles from './ProductInfo.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { uploadSelectedCategoryAtom } from '@/store/category';
import { SelectTrigger, TextInput } from '@/components/common/Input';
import { newDealAtom } from '@/store';
import { overlay } from '@/context/overlay';
import { UploadCategorySelectModal } from '@/components/common/Modal';

interface ProductInfoProps {
    onAiCategorySuggestion?: (title: string) => void;
}

export function ProductInfo({ onAiCategorySuggestion }: ProductInfoProps) {
    const [deal, setDeal] = useAtom(newDealAtom);
    const uploadSelectedCategory = useAtomValue(uploadSelectedCategoryAtom);

    const categoryLabel = uploadSelectedCategory ? uploadSelectedCategory.path.join(' > ') : '카테고리 선택';

    const handleCategorySelect = () => {
        overlay.open(UploadCategorySelectModal);
    };

    return (
        <div className={styles.productInfoWrapper}>
            <TextInput
                placeholder="상품명 입력"
                value={deal.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeal({ ...deal, title: e.target.value })}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    if (onAiCategorySuggestion && e.target.value.trim()) {
                        onAiCategorySuggestion(e.target.value.trim());
                    }
                }}
            />
            <SelectTrigger
                label={categoryLabel}
                onClick={handleCategorySelect}
            />
        </div>
    );
}
