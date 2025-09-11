import styles from './MainKeywords.module.css';

interface MainKeywordsProps {
    aiActive: boolean;
    keyword: string | null;
}

const MainKeywords = ({ aiActive, keyword }: MainKeywordsProps) => {
    if (!aiActive && !keyword) return null;

    return (
        <span className={styles.searchResult}>
            {aiActive ? 'AI 추천 검색 결과' : `'${keyword}' 검색 결과`}
        </span>
    );
};

export default MainKeywords;
