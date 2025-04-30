import { useState } from 'react';
import { SelectInput } from '@/components/common/Input/ModalSearchInput';
import { mockStores } from '@/mocks/mockStores';
import { useDealUpload } from '@/hooks/useDealUpload';
import * as S from './select.style';

interface Props {
    onClose: () => void;
}

export function StoreSelectModal({ onClose }: Props) {
    const [query, setQuery] = useState('');
    const [inputName, setInputName] = useState('');
    const { setStore } = useDealUpload();

    const filteredStores = mockStores.filter((store) =>
        store.name.includes(query)
    );

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
        <S.selectWrapper>
            <S.listStoreSelect>
                {filteredStores.length > 0 ? (
                    filteredStores.map((store) => (
                        <S.itemSelectStore
                            key={store.id}
                            onClick={() => handleSelectStore(store.id, store.name)}
                        >
                            {store.name}
                        </S.itemSelectStore>
                    ))
                ) : (
                    <S.textGuideStore>
                        검색되지 않는 스토어인 경우 <br /> 작성 완료 후 직접 입력 버튼을 클릭해주세요
                    </S.textGuideStore>
                )}
            </S.listStoreSelect>
            <S.containerFooterSelect>
                <SelectInput
                    style={{ paddingTop: '20px' }}
                    placeholder="스토어 검색"
                    value={inputName}
                    onChange={handleChange}
                    onConfirm={handleDirectInput}
                    directInputLabel="직접 입력"
                />
            </S.containerFooterSelect>
        </S.selectWrapper>
    );
}
