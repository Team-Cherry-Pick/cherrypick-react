import styles from './StoreSelectModal.module.css';
import { useDealUpload } from '@/hooks/useDealUpload';
import { mockStores } from '@/mocks/mockStores';
import { useState } from 'react';
import TextGuideStore from '../TextGuideStore';
import ContainerFooterSelect from '../ContainerFooterSelect';
import ModalSearchInput from '@/components/common/_Input/ModalSearchInput';

interface StoreSelectModalProps {
    onClose: () => void;
}

export default function StoreSelectModal({ onClose }: StoreSelectModalProps) {
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
        onClose();
    };

    const handleDirectInput = () => {
        setStore(0, inputName); // storeId 0: 직접 입력한 사용자 정의 스토어
        onClose();
    };

    return (
        <div>
            <ul className={styles.listStoreSelect}>
                {filteredStores.length > 0 ? (
                    filteredStores.map(store => (
                        <li
                            className={styles.itemSelectStore}
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
            <ContainerFooterSelect>
                <ModalSearchInput
                    placeholder="스토어 검색"
                    value={inputName}
                    onChange={handleChange}
                    onConfirm={handleDirectInput}
                    directInputLabel="직접 입력"
                />
            </ContainerFooterSelect>
        </div>
    );
}
