import { SessionState, Constants, ActionTypes } from '.';

const initialState: SessionState = {
    showcaseProducts: [
        {
            showcaseId: 1,
            showcaseTitle: 'Exclusive Offer',
            showcaseLink: '/',
            showcaseLinkText: 'See All',
            products: [
                {
                    id: 1,
                    name: 'Sprite Can',
                    description: '325ml, Price',
                    price: 4.99,
                    discount: 2.99,
                    review: 4.3,
                    image: 'sprite.png',
                    discountTag: '%15 Discount on Basket',
                    categoryId: 6
                },
                {
                    id: 2,
                    name: 'Diet Coke',
                    description: '325ml, Price',
                    discountTag: 'Best Price',
                    price: 1.99,
                    image: 'dietcoke.png',
                    categoryId: 6
                },
                {
                    id: 3,
                    name: 'Orange Juice',
                    description: '325ml, Price',
                    discountTag: 'Freeshipping',
                    price: 4.99,
                    image: 'juice.png',
                    categoryId: 6
                },
                {
                    id: 4,
                    name: 'Organic Bananas',
                    description: '12kg, Price',
                    discountTag: '%15 Discount on Basket',
                    price: 4.99,
                    image: 'banana.png',
                    categoryId: 6
                },
                {
                    id: 5,
                    name: 'Ginger',
                    description: '250g, Price',
                    discountTag: 'Freeshipping',
                    price: 4.99,
                    image: 'ginger.png',
                    categoryId: 6
                },
                {
                    id: 6,
                    name: 'Egg Chicken Red',
                    description: '4pcs, Price',
                    price: 1.99,
                    image: 'eggs.png',
                    categoryId: 6
                }
            ]
        },
        {
            showcaseId: 2,
            showcaseTitle: 'Best Seller',
            showcaseLink: '/',
            showcaseLinkText: 'See All',
            products: [
                {
                    id: 1,
                    name: 'Sprite Can',
                    description: '325ml, Price',
                    price: 4.99,
                    image: 'sprite.png',
                    categoryId: 6
                },
                {
                    id: 4,
                    name: 'Organic Bananas',
                    description: '12kg, Price',
                    price: 4.99,
                    image: 'banana.png',
                    categoryId: 6
                },
                {
                    id: 5,
                    name: 'Ginger',
                    description: '250g, Price',
                    price: 4.99,
                    image: 'ginger.png',
                    categoryId: 6
                },
                {
                    id: 6,
                    name: 'Egg Chicken Red',
                    description: '4pcs, Price',
                    price: 1.99,
                    image: 'eggs.png',
                    categoryId: 6
                }
            ]
        },
        {
            showcaseId: 3,
            showcaseTitle: 'Groceries',
            showcaseLink: '/',
            showcaseLinkText: 'See All',
            products: [
                {
                    id: 5,
                    name: 'Ginger',
                    description: '250g, Price',
                    price: 4.99,
                    image: 'ginger.png',
                    discount: 3.49,
                    review: 5.0,
                    categoryId: 6
                },
                {
                    id: 6,
                    name: 'Egg Chicken Red',
                    description: '4pcs, Price',
                    price: 1.99,
                    image: 'eggs.png',
                    categoryId: 6
                }
            ],
            categories: [
                {
                    id: 1,
                    title: 'Pulses',
                    menuColor: '#1053B175',
                    menuBorderColor: '#7053B175',
                    categoryImg: 'catfruits.png'
                },
                {
                    id: 2,
                    title: 'Rice',
                    menuColor: '#10F8A44C',
                    menuBorderColor: '#70F8A44C',
                    categoryImg: 'catoil.png'
                },
                {
                    id: 3,
                    title: 'Vegetables',
                    menuColor: '#10FDE598',
                    menuBorderColor: '#70FDE598',
                    categoryImg: 'catoil.png'
                },
                {
                    id: 4,
                    title: 'Chocolates',
                    menuColor: '#10B7DFF5',
                    menuBorderColor: '#70B7DFF5',
                    categoryImg: 'catoil.png'
                }
            ]
        }
    ],
    products: [
        {
            id: 1,
            name: 'Sprite Can',
            description: '325ml, Price',
            price: 4.99,
            image: 'sprite.png',
            categoryId: 6,
            discount: 2.99,
            review: 4.3,
            discountTag: '%15 Discount on Basket'
        },
        {
            id: 2,
            name: 'Diet Coke',
            description: '325ml, Price',
            price: 1.99,
            image: 'dietcoke.png',
            categoryId: 6,
            discountTag: 'Best Price'
        },
        {
            id: 3,
            name: 'Orange Juice',
            description: '325ml, Price',
            price: 4.99,
            image: 'juice.png',
            categoryId: 6
        },
        {
            id: 4,
            name: 'Organic Bananas',
            description: '12kg, Price',
            price: 4.99,
            image: 'banana.png',
            categoryId: 6
        },
        {
            id: 5,
            name: 'Ginger',
            description: '250g, Price',
            price: 4.99,
            image: 'ginger.png',
            categoryId: 6
        },
        {
            id: 6,
            name: 'Egg Chicken Red',
            description: '4pcs, Price',
            price: 1.99,
            image: 'eggs.png',
            discount: 0.99,
            review: 4.5,
            categoryId: 6
        },
        {
            id: 7,
            name: 'Beef',
            description: '1kg, Price',
            price: 4.99,
            image: 'beef.png',
            categoryId: 6
        },
        {
            id: 8,
            name: 'Chicken',
            description: '1kg, Price',
            price: 4.99,
            image: 'chicken.png',
            categoryId: 6
        }
    ],
    categories: [
        {
            id: 1,
            title: 'Fresh Fruits & Vegetable',
            menuColor: '#1053B175',
            menuBorderColor: '#7053B175',
            categoryImg: 'catfruits.png'
        },
        {
            id: 2,
            title: 'Cooking Oil & Ghee',
            menuColor: '#10F8A44C',
            menuBorderColor: '#70F8A44C',
            categoryImg: 'catoil.png'
        },
        {
            id: 3,
            title: 'Meat & Fish',
            menuColor: '#10F7A593',
            menuBorderColor: '#70F7A593',
            categoryImg: 'catfish.png'
        },
        {
            id: 4,
            title: 'Bakery & Snacks',
            menuColor: '#10D3B0E0',
            menuBorderColor: '#70D3B0E0',
            categoryImg: 'catbread.png'
        },
        {
            id: 5,
            title: 'Dairy & Eggs',
            menuColor: '#10FDE598',
            menuBorderColor: '#70FDE598',
            categoryImg: 'categg.png'
        },
        {
            id: 6,
            title: 'Beverages',
            menuColor: '#10B7DFF5',
            menuBorderColor: '#70B7DFF5',
            categoryImg: 'catbeverages.png'
        }
    ],
    basket: [],
    users: [
        {
            id: 1,
            fullName: 'Eren Kan',
            username: 'erenkan',
            email: 'eren.kan@smartface.io',
            password: '1234',
            profileImage: 'userprofilephoto.png'
        },
        {
            id: 2,
            fullName: 'Fuat Guzel',
            username: 'fuatguzel',
            email: 'fuat.guzel@smartface.io',
            password: '12345',
            profileImage: 'userprofilephoto.png'
        },
        {
            id: 3,
            fullName: 'Smartface',
            username: 'smartface',
            email: 'smartface',
            password: '1234',
            profileImage: 'userprofilephoto.png'
        }
    ],
    accountMenus: [
        {
            menuId: 1,
            menuTitle: 'orders',
            menuLeftIcon: ''
        },
        {
            menuId: 2,
            menuTitle: 'settings',
            menuLeftIcon: ''
        },
        {
            menuId: 3,
            menuTitle: 'myDetails',
            menuLeftIcon: ''
        },
        {
            menuId: 4,
            menuTitle: 'paymentMethods',
            menuLeftIcon: ''
        },
        {
            menuId: 5,
            menuTitle: 'promo',
            menuLeftIcon: ''
        },
        {
            menuId: 6,
            menuTitle: 'notifications',
            menuLeftIcon: ''
        },
        {
            menuId: 7,
            menuTitle: 'help',
            menuLeftIcon: ''
        },
        {
            menuId: 8,
            menuTitle: 'about',
            menuLeftIcon: ''
        }
    ],
    currentUser: null,
    favorites: [],
    isUserLoggedIn: false
};

export default function (state = initialState, action: ActionTypes): SessionState {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case Constants.LOGOUT: {
            newState.currentUser = null;
            break;
        }
        case Constants.SET_NEW_USER: {
            newState.users.push(action.payload);
            break;
        }
        case Constants.SET_CURRENT_USER: {
            newState.currentUser = action.payload;
            break;
        }
        case Constants.ADD_TO_BASKET: {
            if (newState.basket.some((pId) => pId.id === action.payload.product.id)) {
                let updatedData = newState.basket.map((basketItem) =>
                    basketItem.id === action.payload.product.id
                        ? { ...basketItem, count: (basketItem.count += action.payload.count) }
                        : basketItem
                );
                newState.basket = updatedData.filter((a) => a.count > 0);
            } else {
                action.payload.product.count = action.payload.count;
                newState.basket.push(action.payload.product);
            }
            break;
        }
        case Constants.REMOVE_FROM_BASKET: {
            newState.basket = newState.basket.filter((product) => product.id !== action.payload.productId);
            break;
        }
        case Constants.ADD_TO_FAVORITES: {
            newState.favorites.push(action.payload.product);
            break;
        }
        case Constants.REMOVE_FROM_FAVORITES: {
            newState.favorites = state.favorites.filter((product) => product.id !== action.payload.productId);
            break;
        }
        default: {
            break;
        }
    }
    return newState;
}
