import { useAtom, useSetAtom } from 'jotai';
import styles from './BasicFilter.module.css';
import { basicFiltersAtom, toggleBasicFilterAtom, triggerFetchAtom } from '@/store/search';
import { FaCheck } from 'react-icons/fa';
import { useEffect } from 'react';

export function BasicFilter() {
    const [basicFilters] = useAtom(basicFiltersAtom);

    const toggleBasicFilter = useSetAtom(toggleBasicFilterAtom);
    const triggerFetch = useSetAtom(triggerFetchAtom);

    useEffect(() => {
        triggerFetch();
    }, [basicFilters.freeShipping, basicFilters.globalShipping, basicFilters.viewSoldOut, triggerFetch]);

    return (
        <div className={styles.container}>
            <label className={styles.checkBoxLabel} onClick={() => toggleBasicFilter('viewSoldOut')}>
                <div className={`${styles.checkBox} ${basicFilters.viewSoldOut && styles.checkBox_checked}`}>
                    {basicFilters.viewSoldOut && <FaCheck />}
                </div>
                <span>품절 포함</span>
            </label>
            <label className={styles.checkBoxLabel} onClick={() => toggleBasicFilter('freeShipping')}>
                <div className={`${styles.checkBox} ${basicFilters.freeShipping && styles.checkBox_checked}`}>
                    {basicFilters.freeShipping && <FaCheck />}
                </div>
                <span>무료배송만</span>
            </label>
            <label className={styles.checkBoxLabel} onClick={() => toggleBasicFilter('globalShipping')}>
                <div className={`${styles.checkBox} ${basicFilters.globalShipping && styles.checkBox_checked}`}>
                    {basicFilters.globalShipping && <FaCheck />}
                </div>
                <span>해외직구만</span>
            </label>
        </div>
    );
}
