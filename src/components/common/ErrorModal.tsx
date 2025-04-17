// components/ErrorModal.tsx
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { errorState } from '@/store/errorStore';

export const ErrorModal = () => {
    const [error, setError] = useRecoilState(errorState);

    if (!error) return null;

    return (
        <Overlay>
            <ModalBox>
                <Title>에러 발생 안내</Title>
                <Message>{error.message}</Message>
                <CloseButton onClick={() => setError(null)}>닫기</CloseButton>
            </ModalBox>
        </Overlay>
    );
};

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const ModalBox = styled.div`
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 12px;
    width: 320px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    color: #e53e3e;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

const Message = styled.p`
    font-size: 0.875rem;
    color: #333;
`;

const CloseButton = styled.button`
    margin-top: 1rem;
    background-color: #e53e3e;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;
    cursor: pointer;
`;