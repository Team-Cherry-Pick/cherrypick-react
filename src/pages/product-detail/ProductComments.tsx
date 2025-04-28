import { useState } from 'react';
import styled from 'styled-components';
import logoIcon from '@/assets/icons/logo-Icon.svg';

const ProductComments = () => {
    const [sortOption, setSortOption] = useState<'최신순' | '인기순'>('최신순');

    return (
        <Wrapper>
            <Header>
                <Title>댓글 <CommentCount>0</CommentCount></Title>
                <SortOptions>
                    <SortOption
                        $selected={sortOption === '최신순'}
                        onClick={() => setSortOption('최신순')}
                    >
                        최신순
                    </SortOption>
                    |
                    <SortOption
                        $selected={sortOption === '인기순'}
                        onClick={() => setSortOption('인기순')}
                    >
                        인기순
                    </SortOption>
                </SortOptions>
            </Header>

            <NoComment>아직 댓글이 없어요. 첫 댓글의 주인공이 되어 보세요!</NoComment>

            <CommentInputWrapper>
                <Title>댓글 작성</Title>
                <InputRow>
                    <ProfileImage src={logoIcon} alt="" />
                    <InputArea placeholder="댓글을 작성해주세요." />
                    <SubmitButton>댓글 달기</SubmitButton>
                </InputRow>
            </CommentInputWrapper>
        </Wrapper>
    );
};

export default ProductComments;


// 스타일
const Wrapper = styled.section`
    width: 65%;
  border-radius: ${({ theme }) => theme.radius[5]};
  box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.border.card};
  background-color: ${({ theme }) => theme.colors.background.root};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[6]};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.size.lg};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
`;

const CommentCount = styled.span`
  color: ${({ theme }) => theme.colors.content.sub};
  font-weight: ${({ theme }) => theme.typography.weight.regular};
`;

const SortOptions = styled.div`
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.content.sub};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const SortOption = styled.span<{ $selected: boolean }>`
  cursor: pointer;
  color: ${({ theme, $selected }) =>
        $selected ? theme.colors.content.main : theme.colors.content.sub};
  font-weight: ${({ $selected, theme }) =>
        $selected ? theme.typography.weight.semibold : 'normal'};
`;

const NoComment = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.content.sub};
  margin: ${({ theme }) => theme.spacing[10]} 0;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[10]};
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.border.card};
`;

const InputArea = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.radius[2]};
  border: 1px solid ${({ theme }) => theme.colors.border.card};
`;

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[5]};
  background: ${({ theme }) => theme.colors.neutral[300]};
  color: ${({ theme }) => theme.colors.neutral[0]};
  border-radius: ${({ theme }) => theme.radius[2]};
  border: none;
  cursor: pointer;
`;
