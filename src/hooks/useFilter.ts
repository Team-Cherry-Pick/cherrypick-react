import { useAtom } from 'jotai';
import { filterAtom } from '@/store/filter';

export const useFilter = () => {
    const [filter, setFilter] = useAtom(filterAtom);

    const toggleFilter = (key: keyof typeof filter) => {
        setFilter(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const resetFilter = () => {
        setFilter({ soldOut: false, freeShipping: false, overseas: false });
    };

    return {
        filter,
        toggleFilter,
        resetFilter,
    };
};
