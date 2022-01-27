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

export type Product = {
    _id: string;
    name: string;
    shortDescription?: string;
    description?: string;
    price: number;
    images?: Array<string>;
    category: Categories;
    review?: number;
    discount?: number;
    discountTag?: string;
    count?: number;
};
export type AccountMenus = {
    menuId: number;
    menuTitle: string;
    menuLeftIcon: string;
};

export type User = {
    id?: number;
    fullName?: string;
    preferred_username?: string;
    email?: string;
    profileImage?: string;
};

export type Basket = Array<Product>;

export type Favorites = Array<Product>;
