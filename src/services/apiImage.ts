import { Images, UploadImageResponse } from '@/types/Image';
import { publicRequest } from './apiClient';
import { HttpMethod } from '@/types/Api';

export const uploadImage = async ({ images, indexes }: Images): Promise<UploadImageResponse> => {
    const formData = new FormData();

    indexes.forEach(index => {
        if (index < images.length) {
            formData.append('images', images[index]);
        }
    });

    indexes.forEach(index => {
        formData.append('indexes', index.toString());
    });

    const result = await publicRequest<UploadImageResponse>(HttpMethod.POST, '/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    if (result.success) {
        return result.data;
    } else {
        // 에러 발생 시 빈 배열 반환 대신 에러를 throw
        throw new Error(result.error?.message || '이미지 업로드에 실패했습니다.');
    }
};
