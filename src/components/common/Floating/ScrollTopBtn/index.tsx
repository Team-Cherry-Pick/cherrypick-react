// components/common/Floating/ScrollTopButton.tsx
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollTopBtn = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!visible) return null;

    return (
        <Button onClick={handleScrollTop}>
            <FaArrowUp size={24} />
        </Button>
    );
};

export default ScrollTopBtn;

const Button = styled.button`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius[4]};
  background-color: ${({ theme }) => theme.colors.background.root};
  color: ${({ theme }) => theme.colors.neutral[500]};
  border: 1px solid ${({ theme }) => theme.colors.border.board};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
