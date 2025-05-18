import styled from 'styled-components';
import DefaultLayout from '@/components/layout/DefaultLayout';
import ProfileEditBox from './ProfileEditBox';

const ProfileEditPage = () => {
    return (
        <DefaultLayout background="board">
            <Container>
                <ProfileEditBox />
            </Container>
        </DefaultLayout>
    );
};

export default ProfileEditPage;

const Container = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;
