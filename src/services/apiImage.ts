import { Images, UploadImageResponse } from '@/types/Image';
import apiClient from './apiClient';

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

    const response = await apiClient.post('/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    console.log(response);

    return response.data;
};

export const deleteImage = async (imageId: number) => {
    const response = await apiClient.delete(`/image/${imageId}`);
    console.log(response);
};
