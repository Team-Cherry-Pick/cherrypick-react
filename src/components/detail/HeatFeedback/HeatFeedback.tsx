// components/detail/HeatFeedback/HeatFeedback.tsx
import { useState } from 'react';
import { Container, ThumbWrapper, LikeBtn, DislikeBtn, HeatWrapper, Heat, DislikeModal } from './HeatFeedback.style';
import LikeIcon from '@/assets/icons/like.svg?react';
import DislikeIcon from '@/assets/icons/dislike.svg?react';

interface HeatFeedbackProps {
    heat: number;
}

const DISLIKE_REASONS = [
    '가격이 아쉬워요',
    '품질이 아쉬워요',
    '품절된 상품이에요',
    '광고성 글이에요',
    '상품 정보가 틀렸어요',
    '기타',
];

function HeatFeedback({ heat }: HeatFeedbackProps) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [showModal, setShowModal] = useState(false);


    return (
        <Container>
            <ThumbWrapper>
                <LikeBtn $active={liked} onClick={() => setLiked(!liked)}>
                    <LikeIcon />
                </LikeBtn>
            </ThumbWrapper>

            <HeatWrapper>
                <Heat>{heat}°</Heat>
            </HeatWrapper>

            <ThumbWrapper>
                <DislikeBtn
                    $active={disliked}
                    onClick={() => {
                        setDisliked(!disliked);
                        setShowModal((prev) => !prev);
                    }}
                >
                    <DislikeIcon />
                </DislikeBtn>
                {showModal && (
                    <DislikeModal>
                        {DISLIKE_REASONS.map((reason, idx) => (
                            <li key={idx}>{reason}</li>
                        ))}
                    </DislikeModal>
                )}
            </ThumbWrapper>
        </Container >
    );
}

export default HeatFeedback;
