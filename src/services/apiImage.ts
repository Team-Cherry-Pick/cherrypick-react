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

    const response = await publicRequest<UploadImageResponse>(HttpMethod.POST, '/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response;
};

export const deleteImage = async (imageId: number) => {
    const response = await publicRequest(HttpMethod.DELETE, `/image/${imageId}`);
    return response;
};
