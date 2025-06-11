import styles from './StoreSelectModal.module.css';
import CloseIcon from '@/assets/icons/close-Icon.svg';
import { useState } from 'react';
import { useDealUpload } from '@/hooks/useDealUpload';
import { mockStores } from '@/mocks/mockStores';
import TextGuideStore from '../components/TextGuideStore';
import ModalSearchInput from '../components/ModalSearchInput';
import ModalLayout from '../components/ModalLayout';

interface StoreSelectModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    context: string;
}

export function StoreSelectModal({ isOpen, close, unmount, context }: StoreSelectModalProps) {
    const [query, setQuery] = useState('');
    const [inputName, setInputName] = useState('');
    const { setStore } = useDealUpload();

    const filteredStores = mockStores.filter(store => store.name.includes(query));

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
                    {filteredStores.length > 0 ? (
                        filteredStores.map(store => (
                            <li
                                className={styles.storeItem}
                                key={store.id}
                                onClick={() => handleSelectStore(store.id, store.name)}
                            >
                                {store.name}
                            </li>
                        ))
                    ) : (
                        <TextGuideStore>
                            검색되지 않는 스토어인 경우 <br /> 작성 완료 후 직접 입력 버튼을 클릭해주세요
                        </TextGuideStore>
                    )}
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
