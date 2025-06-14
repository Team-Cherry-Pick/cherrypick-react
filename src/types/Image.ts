export interface Images {
    images: File[];
    indexes: number[];
}

export interface Image {
    imageId: number;
    imageUrl: string;
    indexes: number;
}

export type UploadImageResponse = Image[];
