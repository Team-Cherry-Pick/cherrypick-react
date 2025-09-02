import styles from './ProductInfo.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { finalSelectedCategoryAtom } from '@/store/category';
import { SelectTrigger, TextInput } from '@/components/common/Input';
import { newDealAtom } from '@/store';
import { overlay } from '@/context/overlay';
import { CategorySelectModal } from '@/components/common/Modal';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';

export function ProductInfo() {
    const [deal, setDeal] = useAtom(newDealAtom);
    const finalSelectedCategory = useAtomValue(finalSelectedCategoryAtom);
    const isMobile = useIsMobileViewport();

    const categoryLabel = finalSelectedCategory ? finalSelectedCategory.path.join(' > ') : '카테고리 선택';

    // TODO: 수정 후 제거 필요
    const handleCategorySelect = () => {
        if (isMobile) {
            alert('준비 중입니다');
            return;
        }
        
        overlay.open(CategorySelectModal);
    };

    return (
        <div className={styles.productInfoWrapper}>
            <TextInput
                placeholder="상품명 입력"
                value={deal.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeal({ ...deal, title: e.target.value })}
            />
            <SelectTrigger
                label={categoryLabel}
                onClick={handleCategorySelect}
            />
        </div>
    );
}
