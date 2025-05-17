// components/common/Dropdown/index.tsx
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Option {
    label: string;
    value: string;
}

interface DropdownProps {
    anchorRef: React.RefObject<HTMLElement | null>;
    options: Option[];
    selected: string;
    onSelect: (value: string) => void;
    onClose: () => void;
}

export default function Dropdown({
    anchorRef,
    options,
    selected,
    onSelect,
    onClose,
}: DropdownProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    useEffect(() => {
        if (anchorRef.current && ref.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            ref.current.style.top = `${rect.bottom + window.scrollY + 8}px`;
            ref.current.style.left = `${rect.left + window.scrollX}px`;
        }
    }, [anchorRef]);

    return (
        <Wrapper ref={ref}>
            <List>
                {options.map((option) => (
                    <Item
                        key={option.value}
                        onClick={() => onSelect(option.value)}
                        $active={option.value === selected}
                    >
                        {option.label}
                    </Item>
                ))}
            </List>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border: 1px solid ${({ theme }) => theme.colors.border.card};
  border-radius: ${({ theme }) => theme.radius[4]};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 200;
  min-width: 140px;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.spacing[2]} 0;
`;

const Item = styled.li<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme, $active }) =>
        $active ? theme.colors.primary : theme.colors.content.main};
  font-weight: ${({ theme, $active }) =>
        $active ? theme.typography.weight.semibold : theme.typography.weight.regular};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
  }
`;
