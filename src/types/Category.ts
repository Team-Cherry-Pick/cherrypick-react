export interface Category {
    categoryId: number;
    name: string;
    subCategories: Category[];
}
