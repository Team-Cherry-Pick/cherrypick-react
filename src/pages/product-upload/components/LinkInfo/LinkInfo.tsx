import styles from './LinkInfo.module.css';
import { newDealAtom } from '@/store';
import { useAtom } from 'jotai';
import { overlay } from '@/context/overlay';
import { StoreSelectModal } from '@/components/common/Modal';
import { SelectTrigger, TextInput } from '@/components/common/Input';

interface LinkInfoProps {
    aiActive?: boolean;
    onAiFetchProductInfo?: (url: string) => Promise<void>;
}

export function LinkInfo({ aiActive = false, onAiFetchProductInfo }: LinkInfoProps) {
    const [deal, setDeal] = useAtom(newDealAtom);

    const handleStoreSelect = () => {
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
                onBlur={() => {
                    if (aiActive && onAiFetchProductInfo && deal.originalUrl.trim()) {
                        onAiFetchProductInfo(deal.originalUrl);
                    }
                }}
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
