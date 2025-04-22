import { useState } from 'react';
import { SelectInput } from '@/components/common/Input/ModalSearchInput';
import * as S from './select.style';

const STORE_LIST = [
    '쿠팡',
    '지마켓',
    '11번가',
    '옥션',
    '롯데온',
    '알리익스프레스',
    'SSG몰',
    '하이마트',
];

export function StoreSelectModal() {
    const [queryStoreSearch, setQueryStoreSearch] = useState('');
    const [inputStoreName, setInputStoreName] = useState('');

    const filteredStoreList = STORE_LIST.filter(store => store.includes(queryStoreSearch));

    const handleChangeStoreInput = (value: string) => {
        setQueryStoreSearch(value);
        setInputStoreName(value);
    };

    const handleClickDirectInput = () => {
        console.log('직접 입력한 값:', inputStoreName);
    };

    return (
        <S.selectWrapper>
            <S.listStoreSelect>
                {filteredStoreList.length > 0 ? (
                    filteredStoreList.map(store => (
                        <S.itemSelectStore key={store}>{store}</S.itemSelectStore>
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
                    value={inputStoreName}
                    onChange={handleChangeStoreInput}
                    onConfirm={handleClickDirectInput}
                    directInputLabel="직접 입력"
                />
            </S.containerFooterSelect>
        </S.selectWrapper>
    );
}
