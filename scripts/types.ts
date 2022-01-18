export type Categories = {
    id: number;
    title: string;
    menuColor: string;
    menuBorderColor: string;
    categoryImg: string;
};

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
