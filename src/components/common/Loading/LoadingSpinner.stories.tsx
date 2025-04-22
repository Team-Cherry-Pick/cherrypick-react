import { LoadingSpinner } from './LoadingSpinner';

export default {
    title: 'Components/Common/LoadingSpinner',
    component: LoadingSpinner,
};

export const Default = () => <LoadingSpinner />;

export const WithMessage = () => (
    <LoadingSpinner message="데이터를 불러오는 중입니다..." />
);
