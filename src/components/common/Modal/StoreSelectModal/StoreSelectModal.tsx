import styles from './StoreSelectModal.module.css';
import CloseIcon from '@/assets/icons/close-Icon.svg?react';
import { Suspense, useState } from 'react';
import { useDealUpload } from '@/hooks/useDealUpload';
import TextGuideStore from '../components/TextGuideStore';
import ModalSearchInput from '../components/ModalSearchInput';
import ModalLayout from '../components/ModalLayout';
import { useAtom } from 'jotai';
import { FaCheck } from 'react-icons/fa';
import { Button } from '../../Button';
import { selectedStoresAtom } from '@/store/search';
import { useStoresQuery } from '@/store/store';
import { LoadingSpinner } from '@/components/common/Loading/LoadingSpinner';

interface StoreSelectModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    context: 'main' | 'upload';
}

function StoreList({
    query,
    onSelectStore,
    context,
    selectedStores,
}: {
    query: string;
    onSelectStore: (id: number, name: string) => void;
    context: 'main' | 'upload';
    selectedStores?: { name: string; storeId: number }[];
}) {
    const { data: stores = [], isLoading, error } = useStoresQuery();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div style={{ color: 'var(--color-error)', padding: '1rem', textAlign: 'center' }}>
                스토어 목록을 불러오는데 실패했습니다.
            </div>
        );
    }

    const filteredStores = stores.filter(store => store.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <>
            {filteredStores.length > 0 ? (
                filteredStores.map(store => {
                    const isSelected = selectedStores?.some(s => s.storeId === store.storeId);
                    return (
                        <li
                            className={`${styles.storeItem} ${isSelected && styles.storeItem_selected}`}
                            key={store.storeId}
                            onClick={() => onSelectStore(store.storeId, store.name)}
                        >
                            {store.name}
                            {context === 'main' && <FaCheck />}
                        </li>
                    );
                })
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
    const [stores, setStores] = useAtom(selectedStoresAtom);
    const [selectedStores, setSelectedStores] = useState<{ name: string; storeId: number }[]>(stores);
    const { setStore } = useDealUpload();

    const handleChange = (value: string) => {
        setQuery(value);
        setInputName(value);
    };

    const handleSelectStore = (storeId: number, storeName: string) => {
        if (context === 'main') {
            setSelectedStores(prev => {
                const exists = prev.some(store => store.storeId === storeId);
                if (exists) {
                    // 이미 있으면 제거
                    return prev.filter(store => store.storeId !== storeId);
                } else {
                    // 없으면 추가
                    return [...prev, { storeId, name: storeName }];
                }
            });
        } else {
            setStore(storeId, storeName);
            close();
        }
    };

    const handleRemoveStore = (storeId: number) => {
        setSelectedStores(prev => prev.filter(store => store.storeId !== storeId));
    };

    const handleDirectInput = () => {
        if (context === 'main') {
            const trimmed = inputName.trim();
            if (!trimmed) return;
            if (!selectedStores.find(s => s.name === trimmed)) {
                setSelectedStores(prev => [...prev, { storeId: 0, name: inputName.trim() }]);
            }
        } else {
            setStore(0, inputName); // storeId 0: 직접 입력한 사용자 정의 스토어
            close();
        }
    };

    const handleSubmit = () => {
        setStores(selectedStores);
        close();
    };

    if (context === 'main') {
        return (
            <ModalLayout isOpen={isOpen} onExit={unmount}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>스토어 선택</h2>
                        <button className={styles.closeButton} onClick={close}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div className={styles.selectedStoreContainer}>
                        {selectedStores.length > 0 ? (
                            selectedStores.map(store => (
                                <div key={store.storeId} className={styles.selectedStoreWrapper}>
                                    <span className={styles.selectedStoreName}>{store.name}</span>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => handleRemoveStore(store.storeId)}
                                    >
                                        <CloseIcon width={10} height={10} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div>스토어를 추가해주세요.</div>
                        )}
                    </div>
                    <div className={styles.searchInputWrapper}>
                        <ModalSearchInput
                            placeholder="스토어 검색"
                            value={inputName}
                            onChange={handleChange}
                            onConfirm={handleDirectInput}
                            directInputLabel="직접 추가"
                        />
                    </div>
                    <Suspense>
                        <ul className={styles.storeContainer}>
                            <StoreList
                                query={query}
                                onSelectStore={handleSelectStore}
                                context="main"
                                selectedStores={selectedStores}
                            />
                        </ul>
                    </Suspense>
                    <div className={styles.footer}>
                        <button className={styles.resetButton} onClick={() => setSelectedStores([])}>
                            초기화
                        </button>
                        <Button variant="sub" size="long" onClick={handleSubmit}>
                            선택
                        </Button>
                    </div>
                </div>
            </ModalLayout>
        );
    }

    return (
        <ModalLayout isOpen={isOpen} onExit={unmount}>
            <div className={`${styles.container} ${styles.container_upload}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>스토어 선택</h2>
                    <button className={styles.closeButton} onClick={close}>
                        <CloseIcon />
                    </button>
                </div>
                <ul className={styles.storeContainer}>
                    <Suspense fallback={<div>스토어 목록을 불러오는 중...</div>}>
                        <StoreList query={query} onSelectStore={handleSelectStore} context="upload" />
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
