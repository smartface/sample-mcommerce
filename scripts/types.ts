import { pgNutritions } from 'pages';

export type Categories = {
    _id: string;
    title: string;
    menuColor: string;
    borderColor: string;
    categoryImg: string;
};

export type HomeShowcases = {
    _id?: string;
    title?: string;
    products?: Product[];
    categories?: Categories[];
};

export type Metadata = {
    totalCount: number;
    page: number;
};

export type ProductResponse = {
    metadata: Metadata;
    products: Product[];
};

export type Product = {
    _id: string;
    name: string;
    shortDescription?: string;
    description?: string;
    price: number;
    images?: Array<string>;
    category: Categories;
    reviews?: Array<Review>;
    discountPrice?: number;
    discountTag?: string;
    count?: number;
    rating?: number;
    labels: Array<Label>;
    nutritions: Nutritions;
};
export type AccountMenus = {
    menuId: number;
    menuTitle: string;
    menuLeftIcon: string;
};

export type User = {
    sub: string;
    given_name: string;
    preferred_username: string;
    email: string;
    profileImage: string;
    name: string;
    family_name: string;
};

export type Basket = Array<Product>;

export type Favorites = Array<Product>;

export type Banner = {
    _id: string;
    productId?: string;
    categoryId?: string;
};

export type Review = {
    star: number;
    comment: string;
    productId: string;
    name: string;
    sub: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Label = {
    name: string;
    color: string;
};

export type Nutritions = {
    Fat?: string;
    Iron?: string;
    ingredients?: string;
};

export type Address = {
    fullAddress: string,
    title: string,
    firstName: string,
    lastName: string,
    userId: number
}
export type CheckoutListItem = {
    title: string,
    description: string
}