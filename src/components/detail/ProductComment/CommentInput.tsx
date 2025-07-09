import { useState } from 'react';
import {
    CommentInputWrapper,
    Title,
    InputRow,
    ProfileImage,
    InputArea,
    SubmitButtonRow,
    SubmitButton,
    FallbackIcon,
    CancelButton,
} from './ProductComments.style';
import { useRequireLogin } from '@/hooks/useRequireLogin';
import { useParams } from 'react-router-dom';
import { AccessTokenService } from '@/services/accessTokenService';
import { AccessTokenType } from '@/types/Api';
import { authRequest } from '@/services/apiClient';
import { HttpMethod } from '@/types/Api';
import DefaultProfileIcon from '@/assets/icons/profile-Icon.svg';

type CommentInputProps = {
    userImageUrl?: string | null;
    isReply?: boolean;
    parentId?: number | null;
    onCancel?: () => void;
    onSuccess?: () => void;
};

const CommentInput = ({ userImageUrl, isReply = false, parentId = null, onCancel, onSuccess }: CommentInputProps) => {
    const [comment, setComment] = useState('');
    const { guard } = useRequireLogin();
    const { id } = useParams();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = async () => {
        const token = AccessTokenService.get(AccessTokenType.USER);
        if (!token) {
            alert('로그인 후 이용해주세요');
            return;
        }
        if (!guard()) return;

        try {
            await authRequest(
                HttpMethod.POST,
                `/comment/${id}`,
                {
                    content: comment,
                    ...(isReply && parentId !== null && { parentId }),
                }
            );
            alert(isReply ? '답글이 작성되었습니다.' : '댓글이 작성되었습니다.');
            setComment('');
            onSuccess?.();
        } catch (error) {
            console.error(isReply ? '답글 작성 실패:' : '댓글 작성 실패:', error);
            alert(isReply ? '답글 작성에 실패했습니다.' : '댓글 작성에 실패했습니다.');
        }
    };

    const token = AccessTokenService.get(AccessTokenType.USER);
    const isLoggedIn = !!token;

    return (
        <CommentInputWrapper>
            {!isReply && <Title>댓글 작성</Title>}

            <InputRow>
                {!isReply && (
                    <>
                        {userImageUrl ? (
                            <ProfileImage src={userImageUrl} alt="profile" />
                        ) : (
                            <FallbackIcon>
                                <img src={DefaultProfileIcon} alt="기본 프로필" width={32} height={32} />
                            </FallbackIcon>
                        )}
                    </>
                )}
                <InputArea
                    placeholder={isReply ? '답글을 작성해주세요.' : isLoggedIn ? '댓글을 작성해주세요.' : '로그인 후 이용해주세요.'}
                    value={comment}
                    onChange={handleChange}
                    disabled={!isLoggedIn}
                    style={isReply ? { marginLeft: 0 } : undefined}
                />
            </InputRow>
            <SubmitButtonRow>
                {isReply && onCancel && (
                    <CancelButton onClick={onCancel}>
                        취소
                    </CancelButton>
                )}
                <SubmitButton disabled={!comment.trim() || !isLoggedIn} onClick={handleSubmit}>
                    {isReply ? '답글 달기' : '댓글 달기'}
                </SubmitButton>
            </SubmitButtonRow>
        </CommentInputWrapper>
    );
};

export default CommentInput;
