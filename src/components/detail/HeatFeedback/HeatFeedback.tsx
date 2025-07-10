// components/detail/HeatFeedback/HeatFeedback.tsx
import { useState, useRef, useEffect } from 'react';
import { Container, ThumbWrapper, LikeBtn, DislikeBtn, HeatWrapper, Heat, DislikeModal } from './HeatFeedback.style';
import LikeIcon from '@/assets/icons/like.svg?react';
import DislikeIcon from '@/assets/icons/dislike.svg?react';
import { voteDeal, VoteType, DislikeReason } from '@/services/apiVote';

interface HeatFeedbackProps {
    heat: number;
    dealId: number;
    initialVoteType: 'TRUE' | 'FALSE' | 'NONE';
    onVoteChange?: () => void; // 투표 변경 시 부모 컴포넌트에서 데이터를 다시 가져오기 위한 콜백
}

const DISLIKE_REASONS: { label: string; value: DislikeReason }[] = [
    { label: '가격이 아쉬워요', value: 'BAD_PRICE' },
    { label: '품질이 아쉬워요', value: 'BAD_QUALITY' },
    { label: '품절된 상품이에요', value: 'SOLD_OUT' },
    { label: '광고성 글이에요', value: 'ADVERTISING' },
    { label: '상품 정보가 틀렸어요', value: 'WRONG_INFO' },
    { label: '기타', value: 'OTHER' },
];

function HeatFeedback({ heat, dealId, initialVoteType, onVoteChange }: HeatFeedbackProps) {
    const [voteType, setVoteType] = useState<VoteType>(initialVoteType);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<HTMLUListElement>(null);

    // initialVoteType이 변경되면 상태 업데이트
    useEffect(() => {
        setVoteType(initialVoteType);
    }, [initialVoteType]);

    useEffect(() => {
        if (!showModal) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setShowModal(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showModal]);

    const handleLike = async () => {
        if (voteType === 'TRUE') {
            // 이미 추천 상태면 취소
            try {
                await voteDeal({ dealId, voteType: 'NONE' });
                setVoteType('NONE');
                alert('투표가 취소되었습니다!');
                onVoteChange?.(); // 부모 컴포넌트에서 데이터 다시 가져오기
            } catch {
                alert('투표에 실패했습니다.');
            }
            return;
        }
        try {
            await voteDeal({ dealId, voteType: 'TRUE' });
            setVoteType('TRUE');
            setShowModal(false);
            alert('투표가 완료되었습니다!');
            onVoteChange?.(); // 부모 컴포넌트에서 데이터 다시 가져오기
        } catch {
            alert('투표에 실패했습니다.');
        }
    };

    const handleDislike = () => {
        if (voteType === 'FALSE') {
            // 이미 비추천 상태면 취소
            voteDeal({ dealId, voteType: 'NONE' })
                .then(async () => {
                    setVoteType('NONE');
                    setShowModal(false);
                    alert('투표가 취소되었습니다!');
                    onVoteChange?.(); // 부모 컴포넌트에서 데이터 다시 가져오기
                })
                .catch(() => alert('투표에 실패했습니다.'));
            return;
        }
        setShowModal((prev) => !prev);
    };

    const handleDislikeReason = async (reason: DislikeReason) => {
        try {
            await voteDeal({ dealId, voteType: 'FALSE', dislikeReason: reason });
            setVoteType('FALSE');
            setShowModal(false);
            alert('투표가 완료되었습니다!');
            onVoteChange?.(); // 부모 컴포넌트에서 데이터 다시 가져오기
        } catch {
            alert('투표에 실패했습니다.');
        }
    };

    return (
        <Container>
            <ThumbWrapper>
                <LikeBtn $active={voteType === 'TRUE'} onClick={handleLike}>
                    <LikeIcon />
                </LikeBtn>
            </ThumbWrapper>

            <HeatWrapper>
                <Heat>{heat}°</Heat>
            </HeatWrapper>

            <ThumbWrapper>
                <DislikeBtn $active={voteType === 'FALSE'} onClick={handleDislike}>
                    <DislikeIcon />
                </DislikeBtn>
                {showModal && (
                    <DislikeModal ref={modalRef}>
                        {DISLIKE_REASONS.map((reason, idx) => (
                            <li key={idx} onClick={() => handleDislikeReason(reason.value)}>{reason.label}</li>
                        ))}
                    </DislikeModal>
                )}
            </ThumbWrapper>
        </Container >
    );
}

export default HeatFeedback;
