import styled from 'styled-components';
import { useAtom } from 'jotai';
import { newDealAtom } from '@/store/deals';
import { TextInput } from '@/components/common/Input';
import BadgeLabel from '@/components/common/Badge/BadgeLabel';

const SHIPPING_BADGES = ['무료배송', '조건 무료배송', '유료 배송'];
const badgeToType: Record<string, 'FREE' | 'PAID' | 'CONDITIONAL'> = {
    '무료배송': 'FREE',
    '조건 무료배송': 'CONDITIONAL',
    '유료 배송': 'PAID',
};

const ShippingInfoSection = () => {
    const [deal, setDeal] = useAtom(newDealAtom);

    const handleBadgeClick = (label: string) => {
        const selectedType = badgeToType[label as keyof typeof badgeToType];
        setDeal({
            ...deal,
            shipping: {
                ...deal.shipping,
                shippingType:
                    deal.shipping.shippingType === selectedType ? 'FREE' : selectedType,
            },
        });
    };

    return (
        <SectionContainer>
            <SectionTitle>배송 정보</SectionTitle>
            <BadgeBox>
                {SHIPPING_BADGES.map((label) => (
                    <BadgeLabel
                        key={label}
                        label={label}
                        selected={deal.shipping.shippingType === badgeToType[label as keyof typeof badgeToType]}
                        onClick={() => handleBadgeClick(label)}
                    />
                ))}
            </BadgeBox>
            <TextBox>
                <TextInput
                    placeholder="무료배송 조건"
                    value={deal.shipping.shippingRule}
                    onChange={(e) =>
                        setDeal({
                            ...deal,
                            shipping: {
                                ...deal.shipping,
                                shippingRule: e.target.value,
                            },
                        })
                    }
                />
                <TextInput
                    placeholder="배송비"
                    value={deal.shipping.shippingPrice.toString()}
                    onChange={(e) =>
                        setDeal({
                            ...deal,
                            shipping: {
                                ...deal.shipping,
                                shippingPrice: Number(e.target.value) || 0,
                            },
                        })
                    }
                />
            </TextBox>
        </SectionContainer>
    );
};

export default ShippingInfoSection;

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
