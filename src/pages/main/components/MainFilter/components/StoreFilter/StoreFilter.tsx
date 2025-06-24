import { overlay } from '@/context/overlay';
import styles from './StoreFilter.module.css';
import { StoreSelectModal } from '@/components/common/Modal';
import { PlusIcon } from 'lucide-react';
import { useAtom, useSetAtom } from 'jotai';
import { selectedStoresAtom, triggerFetchAtom } from '@/store/search';
import CloseIcon from '@/assets/icons/close-Icon.svg';
import { useEffect } from 'react';

export function StoreFilter() {
    const [selectedStores, setSelectedStores] = useAtom(selectedStoresAtom);
    const triggerFetch = useSetAtom(triggerFetchAtom);

    const handleResetStore = () => {
        setSelectedStores([]);
    };

    const handleRemoveStore = (storeId: number) => {
        setSelectedStores(prev => prev.filter(store => store.storeId !== storeId));
    };

    useEffect(() => {
        triggerFetch();
    }, [selectedStores.length, triggerFetch]);

    return (
        <div>
            <div className={styles.flexBox}>
                <div className={styles.title}>스토어</div>
                {selectedStores.length > 0 && (
                    <button className={styles.resetButton} onClick={handleResetStore}>
                        초기화
                    </button>
                )}
            </div>
            <div className={styles.storeContainer}>
                <button
                    className={styles.addButton}
                    onClick={() => {
                        overlay.open(props => {
                            return <StoreSelectModal {...props} context="main" />;
                        });
                    }}
                >
                    <span>추가</span>
                    <PlusIcon width={14} />
                </button>
                {selectedStores.map(store => (
                    <div key={store.storeId} className={styles.storeBadge}>
                        {store.name}
                        <button className={styles.closeButton} onClick={() => handleRemoveStore(store.storeId)}>
                            <img src={CloseIcon} alt="삭제" width={12} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
