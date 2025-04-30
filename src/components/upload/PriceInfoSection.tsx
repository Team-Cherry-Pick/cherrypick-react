import styled from 'styled-components';
import { useAtom } from 'jotai';
import { newDealAtom } from '@/store/deals';
import { TextInput } from '@/components/common/Input';
import BadgeLabel from '@/components/common/Badge/BadgeLabel';

const PRICE_BADGES = ['다양한가격', '$'];
const priceBadgeMap = {
    '다양한가격': 'KRW',
    '$': 'USD',
} as const;

type PriceBadgeLabel = keyof typeof priceBadgeMap;

const PriceInfoSection = () => {
    const [deal, setDeal] = useAtom(newDealAtom);

    const handleBadgeClick = (label: PriceBadgeLabel) => {
        const clickedType = priceBadgeMap[label];

        setDeal({
            ...deal,
            price: {
                ...deal.price,
                priceType: deal.price.priceType === clickedType ? null : clickedType,
            },
        });
    };

    return (
        <SectionContainer>
            <SectionTitle>가격 정보</SectionTitle>
            <BadgeBox>
                {PRICE_BADGES.map(label => (
                    <BadgeLabel
                        key={label}
                        label={label}
                        selected={deal.price.priceType === priceBadgeMap[label as PriceBadgeLabel]}
                        onClick={() => handleBadgeClick(label as PriceBadgeLabel)}
                    />
                ))}
            </BadgeBox>
            <TextBox>
                <TextInput
                    placeholder="세일가"
                    value={deal.price.discountedPrice.toString()}
                    onChange={(e) => setDeal({
                        ...deal,
                        price: { ...deal.price, discountedPrice: Number(e.target.value) || 0 }
                    })}
                />
                <TextInput
                    placeholder="정가"
                    value={deal.price.regularPrice.toString()}
                    onChange={(e) => setDeal({
                        ...deal,
                        price: { ...deal.price, regularPrice: Number(e.target.value) || 0 }
                    })}
                />
            </TextBox>
        </SectionContainer>
    );
};

export default PriceInfoSection;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: ${({ theme }) => theme.spacing[2]};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SectionTitle = styled.div`
  color: ${({ theme }) => theme.colors.content.main};
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

const BadgeBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const TextBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
`;
