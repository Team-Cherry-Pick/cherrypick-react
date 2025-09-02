import styles from './LinkInfo.module.css';
import { newDealAtom } from '@/store';
import { useAtom } from 'jotai';
import { overlay } from '@/context/overlay';
import { StoreSelectModal } from '@/components/common/Modal';
import { SelectTrigger, TextInput } from '@/components/common/Input';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';

export function LinkInfo() {
    const [deal, setDeal] = useAtom(newDealAtom);
    const isMobile = useIsMobileViewport();

    // TODO: 수정 후 제거 필요
    const handleStoreSelect = () => {
        if (isMobile) {
            alert('준비 중입니다');
            return;
        }
        
        overlay.open(props => {
            return <StoreSelectModal {...props} context="upload" />;
        });
    };

    return (
        <div className={styles.linkInfoWrapper}>
            <TextInput
                placeholder="상품 URL 입력"
                value={deal.originalUrl}
                onChange={e => setDeal({ ...deal, originalUrl: e.target.value })}
                style={{
                    color: /^https?:\/\//.test(deal.originalUrl) ? '#000' : undefined,
                    textDecoration: /^https?:\/\//.test(deal.originalUrl) ? 'underline' : undefined,
                }}
            />
            <SelectTrigger
                label={deal.storeName || '스토어 선택'}
                onClick={handleStoreSelect}
            />
        </div>
    );
}
