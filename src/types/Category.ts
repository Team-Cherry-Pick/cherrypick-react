export interface Category {
    categoryId: number;
    name: string;
    subCategories: Category[];
}

export interface CategoryTree {
    categories: Category[];
}
