import styles from './JoinBetaPage.module.css';
import DefaultLayout from '@/components/layout/DefaultLayout';
import useIsMobileViewport from '@/hooks/useIsMobileViewport';

const JoinBetaPage = () => {
    const isMobile = useIsMobileViewport();

    return (
        <DefaultLayout background="board">
            <div className={styles.container}>
                <div className={`${isMobile ? styles.joinBetaBoxMobile : styles.joinBetaBoxWrapper}`}>
                    {/* 빈 페이지 - 추후 컨텐츠 추가 예정 */}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default JoinBetaPage;