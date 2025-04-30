import styled from 'styled-components';

interface Props {
    label: string;
    selected: boolean;
    onClick: () => void;
}

const BadgeLabel = ({ label, selected, onClick }: Props) => {
    return (
        <Wrapper selected={selected} onClick={onClick}>
            <Label selected={selected}>{label}</Label>
        </Wrapper>
    );
};

export default BadgeLabel;

const Wrapper = styled.div<{ selected: boolean }>`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2.5]}`};
  border-radius: ${({ theme }) => theme.radius[4]};
  border: 1px solid
    ${({ theme, selected }) =>
        selected ? theme.colors.neutral[500] : theme.colors.neutral[200]};
  background-color: ${({ theme, selected }) =>
        selected ? theme.colors.neutral[800] : 'transparent'};
  cursor: pointer;
`;

const Label = styled.div<{ selected: boolean }>`
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
  font-family: 'Pretendard', sans-serif;
  color: ${({ theme, selected }) =>
        selected ? theme.colors.neutral[0] : theme.colors.content.sub};
`;
