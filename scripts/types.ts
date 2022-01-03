export type HomeShowcases = {
    showcaseTitle: string;
    showcaseLink: string;
    showcaseLinkText: string;
    products: Product[];
};

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    categoryId: number;
    discountTag: string;
};
