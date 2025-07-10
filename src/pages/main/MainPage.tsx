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
import { useAtomValue, useSetAtom } from 'jotai';
import { keywordAtom, triggerFetchAtom } from '@/store/search';
import { Helmet } from 'react-helmet-async';

const MainPage = () => {
    const [aiActive, setAiActive] = useState(false);
    const keyword = useAtomValue(keywordAtom);
    const triggerFetch = useSetAtom(triggerFetchAtom);

    useEffect(() => {
        triggerFetch();
    }, [keyword, triggerFetch]);

    return (
        <>
            <Helmet>
                <title>Repik - 핫딜 모음</title>
                <meta name="description" content="최신 핫딜, 할인 정보를 한눈에!" />
                <meta property="og:title" content="리픽 - 핫딜 모음" />
                <meta property="og:description" content="최신 핫딜, 할인 정보를 한눈에!" />
                <meta property="og:image" content="https://repik.kr/repik-og.jpg" />
            </Helmet>
            <DefaultLayout>
                <div className={styles.container}>
                    <MainFilter aiActive={aiActive} />
                    <div style={{ width: '100%' }}>
                        <MainSearchBar aiActive={aiActive} setAiActive={setAiActive} />
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
        </>
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
