import { useState } from 'react';
import {
    CommentInputWrapper,
    Title,
    InputRow,
    ProfileImage,
    InputArea,
    SubmitButtonRow,
    SubmitButton,
} from './ProductComments.style';
import logoIcon from '@/assets/icons/logo-Icon.svg';

const CommentInput = () => {
    const [comment, setComment] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    return (

        <CommentInputWrapper>
            <Title>댓글 작성</Title>
            <InputRow>
                <ProfileImage src={logoIcon} alt="profile" />
                <InputArea
                    placeholder="댓글을 작성해주세요."
                    value={comment}
                    onChange={handleChange}
                />
            </InputRow>
            <SubmitButtonRow>
                <SubmitButton disabled={!comment.trim()}>
                    댓글 달기
                </SubmitButton>
            </SubmitButtonRow>
        </CommentInputWrapper>
    );
};

export default CommentInput;
