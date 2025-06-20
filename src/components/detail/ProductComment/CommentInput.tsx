import { CommentInputWrapper, Title, InputRow, ProfileImage, InputArea, SubmitButton } from './ProductComments.style';
import logoIcon from '@/assets/icons/logo-Icon.svg';

const CommentInput = () => (
    <CommentInputWrapper>
        <Title>댓글 작성</Title>
        <InputRow>
            <ProfileImage src={logoIcon} alt="profile" />
            <InputArea placeholder="댓글을 작성해주세요." />
            <SubmitButton>댓글 달기</SubmitButton>
        </InputRow>
    </CommentInputWrapper>
);

export default CommentInput;
