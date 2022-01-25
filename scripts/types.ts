export type Categories = {
    _id: string;
    title: string;
    menuColor: string;
    borderColor: string;
    categoryImg: string;
};

export type HomeShowcases = {
    showcaseId?: number;
    showcaseTitle?: string;
    showcaseLink?: string;
    showcaseLinkText?: string;
    products?: Product[];
    categories?: Categories[];
};

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    categoryId: number;
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
    id: number;
    fullName: string;
    username: string;
    email: string;
    password: string;
    profileImage: string;
};

export type Basket = Array<Product>;

export type Favorites = Array<Product>;
