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
import { useRequireLogin } from '@/hooks/useRequireLogin';
import { useParams } from 'react-router-dom';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';

import axios from 'axios';

const CommentInput = () => {
    const [comment, setComment] = useState('');
    const { guard } = useRequireLogin();
    const { id } = useParams(); // deal_id 가져오기

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = async () => {
        if (!guard()) return;

        try {
            const token = AccessTokenService.get(AccessTokenType.USER);

            await axios.post(
                `${import.meta.env.VITE_API_URL}/comment/${id}`,
                {
                    content: comment,
                    // parentId: null // 루트 댓글이면 생략 가능
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert('댓글이 작성되었습니다.');
            setComment('');
        } catch (error) {
            console.error('댓글 작성 실패:', error);
            alert('댓글 작성에 실패했습니다.');
        }
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
                <SubmitButton disabled={!comment.trim()} onClick={handleSubmit}>
                    댓글 달기
                </SubmitButton>
            </SubmitButtonRow>
        </CommentInputWrapper>
    );
};

export default CommentInput;
