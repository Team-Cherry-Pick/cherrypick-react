// apis/uploadProfileImage.ts
import axios from 'axios';

export interface UploadedImageInfo {
  imageId: number;
  imageUrl: string;
  indexes: number;
}

export const uploadProfileImage = async (file: File): Promise<UploadedImageInfo> => {
  const formData = new FormData();
  formData.append('images', file);
  formData.append('indexes', '0');

  const res = await axios.post(`${import.meta.env.VITE_API_URL}/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data[0];
};