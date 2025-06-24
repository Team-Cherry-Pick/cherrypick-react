import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MdAutoAwesome } from 'react-icons/md';
import UnderArrowIcon from '@/assets/icons/under-arrow-Icon.svg';
import Dropdown from '@/components/common/Dropdown';
import { useAtom } from 'jotai';
import { sortTypeAtom, timeRangeAtom, triggerFetchAtom } from '@/store/search';

const timeRangeOptions = [
    { label: '최근 3시간', value: 'LAST3HOURS' },
    { label: '최근 6시간', value: 'LAST6HOURS' },
    { label: '최근 12시간', value: 'LAST12HOURS' },
    { label: '최근 24시간', value: 'LAST24HOURS' },
    { label: '최근 3일', value: 'LAST3DAYS' },
    { label: '최근 7일', value: 'LAST7DAYS' },
];

const sortOptions = [
    { label: '리픽 랭킹순', value: 'POPULARITY' },
    { label: '최신순', value: 'LATEST' },
    { label: '조회순', value: 'VIEWS' },
    { label: '투표순', value: 'VOTES' },
    { label: '할인율순', value: 'DISCOUNT_RATE' },
    { label: '저가순', value: 'PRICE_LOW' },
    { label: '고가순', value: 'PRICE_HIGH' },
];

interface SortButtonsProps {
    aiActive: boolean;
    setAiActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const SortButtons = ({ aiActive, setAiActive }: SortButtonsProps) => {
    const [timeRange, setTimeRange] = useAtom(timeRangeAtom);
    const [sortType, setSortType] = useAtom(sortTypeAtom);
    const [openDropdown, setOpenDropdown] = useState<'timeRange' | 'sortType' | null>(null);

    const [, triggerFetch] = useAtom(triggerFetchAtom);

    const timeRef = useRef<HTMLButtonElement>(null);
    const sortRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        triggerFetch();
    }, [timeRange, sortType, triggerFetch]);

    return (
        <SortWrapper>
            <AiSortButton active={aiActive} onClick={() => setAiActive(prev => !prev)}>
                <SlidingContent>
                    <IconCircle active={aiActive} $side={aiActive ? 'right' : 'left'}>
                        <MdAutoAwesome />
                    </IconCircle>
                    <SlidingText active={aiActive} $side={aiActive ? 'left' : 'right'}>
                        AI 추천
                    </SlidingText>
                </SlidingContent>
            </AiSortButton>

            <SortButton
                ref={timeRef}
                onClick={() => setOpenDropdown(prev => (prev === 'timeRange' ? null : 'timeRange'))}
            >
                <span>{timeRangeOptions.find(opt => opt.value === timeRange)?.label}</span>
                <ArrowIcon src={UnderArrowIcon} alt="arrow" $open={openDropdown === 'timeRange'} />
            </SortButton>
            {openDropdown === 'timeRange' && (
                <Dropdown
                    anchorRef={timeRef}
                    options={timeRangeOptions}
                    selected={timeRange || ''}
                    onSelect={value => {
                        setTimeRange(value as typeof timeRange);
                        setOpenDropdown(null);
                    }}
                    onClose={() => setOpenDropdown(null)}
                />
            )}

            <SortButton
                ref={sortRef}
                onClick={() => setOpenDropdown(prev => (prev === 'sortType' ? null : 'sortType'))}
            >
                <span>{sortOptions.find(opt => opt.value === sortType)?.label}</span>
                <ArrowIcon src={UnderArrowIcon} alt="arrow" $open={openDropdown === 'sortType'} />
            </SortButton>
            {openDropdown === 'sortType' && (
                <Dropdown
                    anchorRef={sortRef}
                    options={sortOptions}
                    selected={sortType}
                    onSelect={value => {
                        setSortType(value as typeof sortType);
                        setOpenDropdown(null);
                    }}
                    onClose={() => setOpenDropdown(null)}
                />
            )}
        </SortWrapper>
    );
};

export default SortButtons;

const SortWrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing[2]};
    justify-content: flex-end;

    span {
        margin: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[0.5]};
    }
`;

const SlidingContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing[1]};
    position: relative;
    width: 100%;
    height: ${({ theme }) => theme.spacing[6]};
`;

const ArrowIcon = styled.img<{ $open: boolean }>`
    width: ${({ theme }) => theme.typography.size.xs};
    height: ${({ theme }) => theme.typography.size.xs};
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
`;

const BaseButton = styled.button`
    padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
    border-radius: ${({ theme }) => theme.radius[6]};
    border: 1px solid ${({ theme }) => theme.colors.border.card};
    background-color: ${({ theme }) => theme.colors.neutral[20]};
    color: ${({ theme }) => theme.colors.content.sub};
    font-size: ${({ theme }) => theme.typography.size.sm};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[1]};
`;

const AiSortButton = styled(BaseButton)<{ active?: boolean }>`
    background: ${({ active }) =>
        active ? 'linear-gradient(90deg, #FF8067, #FF4635)' : ({ theme }) => theme.colors.neutral[20]};
    color: ${({ active }) => (active ? 'white' : ({ theme }) => theme.colors.content.sub)};
    font-weight: ${({ theme }) => theme.typography.weight.semibold};
    position: relative;
    transition: all 0.3s ease;
    justify-content: flex-start;
`;

const SortButton = styled(BaseButton)`
    font-weight: ${({ theme }) => theme.typography.weight.regular};
`;

const SlidingText = styled.span<{ active: boolean; $side: 'left' | 'right' }>`
    order: ${({ $side }) => ($side === 'left' ? 0 : 1)};
    opacity: 0;
    animation: fadeIn 0.4s ease forwards;

    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateX(${props => (props.$side === 'left' ? '-5px' : '5px')});
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

const IconCircle = styled.div<{ active?: boolean; $side: 'left' | 'right' }>`
    order: ${({ $side }) => ($side === 'left' ? 0 : 1)};
    width: ${({ theme }) => theme.spacing[6]};
    height: ${({ theme }) => theme.spacing[6]};
    border-radius: 50%;
    background-color: ${({ active }) => (active ? '#FFD56A' : '#C4C4C4')};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    svg {
        width: ${({ theme }) => theme.spacing[3]};
        height: ${({ theme }) => theme.spacing[3]};
        fill: white;
    }
`;
