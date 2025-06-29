import styles from './MainPage.module.css';
import { useEffect, useState } from 'react';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { MainFilter, SortButtons } from './components';
import MainDealList from './MainDealList';
import MainSearchBar from './MainSearchBar';
import styled from 'styled-components';
import MainKeywords from './MainKeywords';
import UploadBtn from '@/components/common/Floating/UploadBtn';
import ScrollTopBtn from '@/components/common/Floating/ScrollTopBtn';
import { useAtom } from 'jotai';
import { keywordAtom, triggerFetchAtom } from '@/store/search';

const MainPage = () => {
    const [aiActive, setAiActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [keyword, setKeyword] = useAtom(keywordAtom);
    const [, triggerFetch] = useAtom(triggerFetchAtom);

    useEffect(() => {
        if (searchQuery) {
            setKeyword(searchQuery);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    useEffect(() => {
        triggerFetch();
    }, [keyword, triggerFetch]);

    return (
        <DefaultLayout>
            <div className={styles.container}>
                <MainFilter aiActive={aiActive} />
                <div style={{ width: '100%' }}>
                    <MainSearchBar
                        aiActive={aiActive}
                        setAiActive={setAiActive}
                        onSearch={keyword => setSearchQuery(keyword)}
                    />
                    <SortRow>
                        <MainKeywords aiActive={aiActive} keyword={keyword} />
                        <SortButtons aiActive={aiActive} setAiActive={setAiActive} />
                    </SortRow>
                    <MainDealList aiActive={aiActive} />
                </div>
            </div>

            <FloatingWrapper>
                <UploadBtn />
                <ScrollTopBtn />
            </FloatingWrapper>
        </DefaultLayout>
    );
};

export default MainPage;

const SortRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-top: ${({ theme }) => theme.spacing[6]};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const FloatingWrapper = styled.div`
    position: fixed;
    right: ${({ theme }) => theme.spacing[4]};
    bottom: ${({ theme }) => theme.spacing[6]};
    padding-inline: ${({ theme }) => theme.spacing[20]};
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: ${({ theme }) => theme.spacing[3]};
    z-index: 100;
`;
