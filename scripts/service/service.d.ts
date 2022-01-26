export type ProductRequestQuery = {
    page: number;
    freeShipping?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    labelId?: string;
};
