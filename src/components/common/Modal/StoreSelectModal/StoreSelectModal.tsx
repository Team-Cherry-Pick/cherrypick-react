import styles from './StoreSelectModal.module.css';
import CloseIcon from '@/assets/icons/close-Icon.svg';
import { Suspense, useState } from 'react';
import { useDealUpload } from '@/hooks/useDealUpload';
import TextGuideStore from '../components/TextGuideStore';
import ModalSearchInput from '../components/ModalSearchInput';
import ModalLayout from '../components/ModalLayout';
import { useAtomValue } from 'jotai';
import { storesAtom } from '@/store';

interface StoreSelectModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    context: string;
}

function StoreList({ query, onSelectStore }: { query: string; onSelectStore: (id: number, name: string) => void }) {
    const stores = useAtomValue(storesAtom);

    const filteredStores = stores.filter(store => store.name.includes(query));

    return (
        <>
            {filteredStores.length > 0 ? (
                filteredStores.map(store => (
                    <li
                        className={styles.storeItem}
                        key={store.storeId}
                        onClick={() => onSelectStore(store.storeId, store.name)}
                    >
                        {store.name}
                    </li>
                ))
            ) : (
                <TextGuideStore>
                    검색되지 않는 스토어인 경우 <br /> 작성 완료 후 직접 입력 버튼을 클릭해주세요
                </TextGuideStore>
            )}
        </>
    );
}

export function StoreSelectModal({ isOpen, close, unmount, context }: StoreSelectModalProps) {
    const [query, setQuery] = useState('');
    const [inputName, setInputName] = useState('');
    const { setStore } = useDealUpload();

    const handleChange = (value: string) => {
        setQuery(value);
        setInputName(value);
    };

    const handleSelectStore = (storeId: number, storeName: string) => {
        setStore(storeId, storeName);
        close();
    };

    const handleDirectInput = () => {
        setStore(0, inputName); // storeId 0: 직접 입력한 사용자 정의 스토어
        close();
    };

    return (
        <ModalLayout isOpen={isOpen} onExit={unmount}>
            <div className={`${styles.container} ${styles.container_upload}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>스토어 선택</h2>
                    <button className={styles.closeButton} onClick={close}>
                        <img src={CloseIcon} alt="닫기" />
                    </button>
                </div>
                <ul className={styles.storeContainer}>
                    <Suspense fallback={<div>스토어 목록을 불러오는 중...</div>}>
                        <StoreList query={query} onSelectStore={handleSelectStore} />
                    </Suspense>
                </ul>
                <div className={styles.footer}>
                    <ModalSearchInput
                        placeholder="스토어 검색"
                        value={inputName}
                        onChange={handleChange}
                        onConfirm={handleDirectInput}
                        directInputLabel="직접 입력"
                    />
                </div>
            </div>
        </ModalLayout>
    );
}
