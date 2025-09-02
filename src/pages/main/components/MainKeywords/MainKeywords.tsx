import styles from './MainKeywords.module.css';

interface MainKeywordsProps {
    keyword: string | null;
}

const MainKeywords = ({ keyword }: MainKeywordsProps) => {
    if (!keyword) return null;

    return (
        <span className={styles.searchResult}>
            '{keyword}' 검색 결과
        </span>
    );
};

export default MainKeywords;
