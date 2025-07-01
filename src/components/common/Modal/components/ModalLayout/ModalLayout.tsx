import styles from './ModalLayout.module.css';
import { PropsWithChildren, useEffect, useRef } from 'react';

type ModalLayoutProps = {
    isOpen?: boolean;
    onExit: () => void;
};

export default function ModalLayout({ children, isOpen = false, onExit }: PropsWithChildren<ModalLayoutProps>) {
    const prevIsOpenRef = useRef(isOpen);

    if (isOpen !== prevIsOpenRef.current) {
        prevIsOpenRef.current = isOpen;

        // 애니메이션 적용하려면 애니메이션 시간만큼 딜레이해서 닫으면 됩니다.
        if (prevIsOpenRef.current === false) {
            setTimeout(() => onExit?.(), 0);
        }
    }

    useEffect(() => {
        // 현재 스크롤 위치 저장
        const scrollY = window.scrollY;

        // body 스크롤 방지
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // 컴포넌트 언마운트 시 원래대로 복구
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';

            // 원래 스크롤 위치로 복구
            window.scrollTo(0, scrollY);
        };
    }, []);

    return (
        <>
            {isOpen === true && (
                <div className={styles.overlay} onClick={onExit}>
                    <div onClick={e => e.stopPropagation()}>{children}</div>
                </div>
            )}
        </>
    );
}
